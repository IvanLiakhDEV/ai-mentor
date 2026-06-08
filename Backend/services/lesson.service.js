import Lesson from '../models/lesson.js';
import Course from '../models/course.js';
import Enrollment from '../models/enrollment.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
import { getCourse } from './course.service.js';
import { runCode } from './code.service.js';
import UserStat from '../models/userStat.js';
import { checkAndUnlockAchievements } from './achievement.service.js';
import { calculateNewStreak } from '../utils/streakCalculator.js';
export const createLesson = async data => {
    const { moduleId, courseId } = data;
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ErrorHandler(`Курсу з id = ${data.courseId} не існує`, 404);
    }
    if (!course.modules.id(moduleId)) {
        throw new ErrorHandler(`Модуля з id = ${data.moduleId} не існує`, 404);
    }
    const count = await Lesson.countDocuments({ courseId });

    const lesson = await Lesson.create({
        ...data,
        sequenceNumber: count + 1,
    });
    return lesson;
};
export const deleteLesson = async lessonId => {
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) throw new ErrorHandler('Урок не знайдено', 404);
    const lessons = await Lesson.find({ moduleId: lesson.moduleId }).sort({ sequenceNumber: 1 });
    await Promise.all(lessons.map((l, index) => Lesson.findByIdAndUpdate(l._id, { sequenceNumber: index + 1 })));
};
export const editLessonInfo = async ({ id, lesson }) => {
    const result = await Lesson.findByIdAndUpdate(
        id,
        {
            $set: { title: lesson.title, theory: lesson.theory, practice: lesson.practice, points: lesson.points },
        },
        { returnDocument: true },
    );
    if (!result) throw new ErrorHandler('Урок не знайдено', 404);
};

export const getLessonById = async (lessonId, userId) => {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw new ErrorHandler('Урок не знайдено', 404);
    const course = await Course.findOne({ _id: lesson.courseId, isArchived: { $ne: true } });
    if (!course) throw new ErrorHandler('Курс не знайдено або він недоступний', 404);
    const enrollment = await Enrollment.findOne({
        courseId: lesson.courseId,
        userId,
    });
    if (!enrollment) throw new ErrorHandler('Ви не записані на цей курс', 403);
    if (lesson.sequenceNumber > enrollment.completedSequence + 1) {
        throw new ErrorHandler('Спочатку пройдіть попередні уроки', 403);
    }
    const l = lesson.toObject();
    l.language = course.language;
    return { lesson: l, course, enrollment };
};
export const getNextLessonData = async ({ userId, courseId }) => {
    const course = await Course.findOne({ _id: courseId, isArchived: { $ne: true } });
    if (!course) throw new ErrorHandler('Курс не знайдено або він недоступний', 404);
    const enrollment = await Enrollment.findOne({
        courseId: course._id,
        userId,
    });
    if (!enrollment) throw new ErrorHandler('Ви не зареєстровані на цей курс', 403);
    const nextLesson = await Lesson.findOne({
        courseId: course._id,
        sequenceNumber: { $gt: enrollment.completedSequence },
    }).sort({ sequenceNumber: 1 });

    if (!nextLesson) {
        return null;
    }
    const resultLesson = nextLesson.toObject();
    resultLesson.language = course.language;
    return resultLesson;
};
export const reorderLessonsService = async lessons => {
    await Lesson.bulkWrite(
        lessons.map(({ _id, sequenceNumber }) => ({
            updateOne: {
                filter: { _id },
                update: { $set: { sequenceNumber } },
            },
        })),
    );
};
export const submitLesson = async (code, lessonId, userId) => {
    const { lesson } = await getLessonById(lessonId, userId);
    const course = await getCourse(lesson.courseId, userId);
    if (!course.isEnrolled) {
        throw new ErrorHandler('Ви не зареєстровані на цей курс', 403);
    }
    const { stdout, stderr, exception, status, isCorrect } = await runCode({
        code,
        testCode: lesson.practice.testCode,
        language: course.language,
    });

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

        const updatedStreakData = calculateNewStreak(currentStat.lastActivityDate, currentStat.currentStreak, currentStat.bestStreak);

        const enrollmentUpdate = {
            $max: { completedSequence: lesson.sequenceNumber },
            $inc: { points: lesson.points },
        };

        const statUpdate = {
            $inc: { lessonsCompleted: 1, points: lesson.points },
            $set: { ...updatedStreakData },
        };

        if (isLastLesson) {
            enrollmentUpdate.$set = { status: 'Completed' };
            statUpdate.$inc.coursesCompleted = 1;
        }

        const updatedStats = await UserStat.findOneAndUpdate({ userId }, statUpdate, { new: true, upsert: true });

        newlyUnlocked = await checkAndUnlockAchievements({ userId, updatedStats });

        await Enrollment.findOneAndUpdate({ courseId: lesson.courseId, userId }, enrollmentUpdate);
    }

    const nextLesson = course.modules?.flatMap(module => module.lessons).find(l => l.sequenceNumber === lesson.sequenceNumber + 1) || null;

    return {
        output: stdout || stderr,
        isCorrect,
        unlockedAchievements: newlyUnlocked,
        nextLesson,
    };
};
