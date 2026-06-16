import PracticeTask from '../models/PracticeTask.js';
import UserStat from '../models/userStat.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
import { generateTask } from './ai.service.js';
import crypto from 'crypto';
import axios from 'axios';
import { getFileNameByLanguage } from '../utils/getFilename.js';
import { calculateNewStreak } from '../utils/streakCalculator.js';
import { checkAndUnlockAchievements } from './achievement.service.js';
import { runCode } from './code.service.js';
export const getMyTasks = async ({ userId, isCompleted, difficulty, page, limit }) => {
    const query = { userId };
    if (isCompleted !== undefined) query.isCompleted = isCompleted;
    if (difficulty) query.difficulty = difficulty;
    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
        PracticeTask.find(query).skip(skip).limit(Number(limit)),
        PracticeTask.countDocuments(query),
    ]);
    return {
        tasks,
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number(page),
    };
};
export const createTask = async ({ userId, topic, difficulty, language }) => {
    const task = await generateTask({ topic, difficulty, language });
    const createdTask = await PracticeTask.create({ ...task, topic, difficulty, language, userId });
    return createdTask;
};
export const getTaskInfo = async ({ id }) => {
    const task = await PracticeTask.findOne({ _id: id, isCompleted: false });
    if (!task) throw new ErrorHandler('Завдання не знайдено або недоступне, перевірте правильність id', 404);
    return task;
};
export const submitTask = async ({ id, code }) => {
    try {
        const task = await getTaskInfo({ id });
        const attempts = task.attempts + 1;
        const { stdout, stderr, isCorrect } = await runCode({
            code,
            testCode: task.testCode,
            language: task.language,
            timeout: 4000,
        });
        let achievements = [];
        if (isCorrect) {
            const userStat = (await UserStat.findOne({ userId: task.userId })) || {
                currentStreak: 0,
                bestStreak: 0,
                lastActivityDate: null,
            };
            const updatedStreakData = calculateNewStreak(userStat.lastActivityDate, userStat.currentStreak, userStat.bestStreak);
            const [, updatedStats] = await Promise.all([
                PracticeTask.findByIdAndUpdate(id, {
                    $set: { isCompleted: true, userCode: code },
                    $inc: { attempts: 1 },
                }),
                UserStat.findOneAndUpdate(
                    { userId: task.userId },
                    {
                        $inc: { points: task.points },
                        $set: updatedStreakData,
                    },
                    { upsert: true, new: true },
                ),
            ]);
            achievements = await checkAndUnlockAchievements({
                userId: task.userId,
                updatedStats,
            });
        } else {
            await PracticeTask.findByIdAndUpdate(
                id,
                {
                    $inc: { attempts: 1 },
                    $set: { userCode: code },
                },
                { returnDocument: 'after' },
            );
        }
        return {
            output: stdout || stderr,
            isCorrect,
            attempts,
            unlockedAchievements: achievements,
        };
    } catch (error) {
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            await PracticeTask.findByIdAndUpdate(id, {
                $inc: { attempts: 1 },
                $set: { userCode: code },
            });
            return {
                output: 'Time Limit Exceeded: Перевищено ліміт часу (4.0с)',
                isCorrect: false,
                unlockedAchievements: [],
            };
        }
        throw error;
    }
};
