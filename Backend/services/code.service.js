import axios from 'axios';
import Enrollment from '../models/enrollment.js';
import { getLessonById } from './lesson.service.js';
import { getCourse } from './course.service.js';
import { getFileNameByLanguage } from '../utils/getFilename.js';
import UserStat from '../models/userStat.js';
import Achievement from '../models/achievement.js';
import UserAchievement from '../models/userAchievement.js';
import crypto from 'crypto';

export const executeCode = async (code, lessonId, userId) => {
    const { lesson } = await getLessonById(lessonId, userId);

    const course = await getCourse(lesson.courseId, userId);

    const secretToken = crypto.randomUUID();
    const studentLogs = `
let __capturedOutput = "";
const __originalLog = console.log;
console.log = (...args) => { 
    __capturedOutput += args.join(' ') + "\\n"; 
    __originalLog(...args); 
};
`;
    const response = await axios.post(
        'https://api.onecompiler.com/v1/run',
        {
            language: course.language,
            files: [
                {
                    name: getFileNameByLanguage(course.language),
                    content: `${studentLogs}\n${code}\n\n${lesson.practice.testCode.replace('__ALL_TESTS_PASSED__', secretToken)}`,
                },
            ],
        },
        {
            headers: {
                'X-API-Key': process.env.ONECOMPILER_KEY,
                'Content-Type': 'application/json',
            },
        },
    );

    const { stdout, stderr, exception, status } = response.data;
    const isCorrect = stdout ? stdout.includes(secretToken) : false;
    const enrollment = await Enrollment.findOne({ courseId: lesson.courseId, userId });
    const alreadyCompleted = enrollment.completedSequence >= lesson.sequenceNumber;
    const isLastLesson = course.numberOfLessons === lesson.sequenceNumber;
    let newlyUnlocked = [];

    if (isCorrect && !alreadyCompleted) {
        const currentStat = (await UserStat.findOne({ userId })) || {
            currentStreak: 0,
            bestStreak: 0,
            lastActivityDate: null,
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let newStreak = currentStat.currentStreak;
        let newBestStreak = currentStat.bestStreak;

        if (!currentStat.lastActivityDate) {
            newStreak = 1;
            newBestStreak = Math.max(1, newBestStreak);
        } else {
            const lastActivity = new Date(currentStat.lastActivityDate);
            if (lastActivity >= today) {
            } else if (lastActivity >= yesterday && lastActivity < today) {
                newStreak += 1;
                newBestStreak = Math.max(newStreak, newBestStreak);
            } else {
                newStreak = 1;
            }
        }

        const enrollmentUpdate = {
            $max: { completedSequence: lesson.sequenceNumber },
            $inc: { points: lesson.points },
        };

        const statUpdate = {
            $inc: { lessonsCompleted: 1, points: lesson.points },
            $set: {
                currentStreak: newStreak,
                bestStreak: newBestStreak,
                lastActivityDate: now,
            },
        };

        if (isLastLesson) {
            enrollmentUpdate.$set = { status: 'Completed' };
            statUpdate.$inc.coursesCompleted = 1;
        }

        const updatedStats = await UserStat.findOneAndUpdate({ userId }, statUpdate, { new: true, upsert: true });

        const achievementConditions = [
            { conditionType: 'lessons_completed', targetValue: { $lte: updatedStats.lessonsCompleted } },
            { conditionType: 'courses_completed', targetValue: { $lte: updatedStats.coursesCompleted } },
            { conditionType: 'points_earned', targetValue: { $lte: updatedStats.points } },
            { conditionType: 'day_streak', targetValue: { $lte: updatedStats.currentStreak } },
        ];

        if (new Date().getHours() < 4) {
            achievementConditions.push({
                conditionType: 'night_lesson_completed',
                targetValue: { $lte: 1 },
            });
        }

        const availableAchievements = await Achievement.find({ $or: achievementConditions });

        for (const achievement of availableAchievements) {
            const { upsertedCount } = await UserAchievement.updateOne(
                { userId, achievementId: achievement._id },
                { $setOnInsert: { userId, achievementId: achievement._id } },
                { upsert: true },
            );

            if (upsertedCount) {
                newlyUnlocked.push(achievement);
                if (achievement.xpReward > 0) {
                    await UserStat.findOneAndUpdate({ userId }, { $inc: { points: achievement.xpReward } });
                }
            }
        }

        await Enrollment.findOneAndUpdate({ courseId: lesson.courseId, userId }, enrollmentUpdate);
    }

    const nextLesson = course.modules?.flatMap(module => module.lessons).find(l => l.sequenceNumber === lesson.sequenceNumber + 1) || null;

    return {
        stdout: stdout?.replace(secretToken, '').trim() || '',
        stderr,
        exception,
        status,
        isCorrect,
        nextLesson,
        unlockedAchievements: newlyUnlocked,
    };
};
