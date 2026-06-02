import PracticeTask from '../models/PracticeTask.js';
import UserStat from '../models/userStat.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
import { generateTask } from './ai.service.js';
import crypto from 'crypto';
import axios from 'axios';
import { getFileNameByLanguage } from '../utils/getFilename.js';
import { calculateNewStreak } from '../utils/streakCalculator.js';
import { checkAndUnlockAchievements } from './achievement.service.js';
export const getMyTasks = async ({ userId }) => {
    return await PracticeTask.find({ userId }).sort({ createdAt: -1 });
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
        const secretToken = crypto.randomUUID();
        let achievements = [];
        const response = await axios.post(
            'https://api.onecompiler.com/v1/run',
            {
                language: task.language,
                files: [
                    {
                        name: getFileNameByLanguage(task.language),
                        content: `${code}\n\n${task.testCode.replace('___TESTS_PASSED___', secretToken)}`,
                    },
                ],
            },
            {
                headers: {
                    'X-API-Key': process.env.ONECOMPILER_KEY,
                    'Content-Type': 'application/json',
                },
                timeout: 4000,
            },
        );
        const { stdout, stderr } = response.data;
        const isCorrect = stdout ? stdout.includes(secretToken) : false;
        const cleanStdout = stdout ? stdout.replace(secretToken, '').trim() : '';
        if (isCorrect) {
            const userStat = (await UserStat.findOne({ userId: task.userId })) || {
                currentStreak: 0,
                bestStreak: 0,
                lastActivityDate: null,
            };
            const updatedStreakData = calculateNewStreak(userStat.lastActivityDate, userStat.currentStreak, userStat.bestStreak);
            const [_, updatedStats] = await Promise.all([
                PracticeTask.findByIdAndUpdate(id, { $set: { isCompleted: true, userCode: code }, $inc: { attempts: 1 } }),
                UserStat.findOneAndUpdate(
                    { userId: task.userId },
                    { $inc: { points: task.points }, $set: updatedStreakData },
                    { upsert: true, new: true },
                ),
            ]);
            achievements = await checkAndUnlockAchievements({ userId: task.userId, updatedStats });
        } else {
            await PracticeTask.findByIdAndUpdate(id, { $inc: { attempts: 1 }, $set: { userCode: code } });
        }
        return { output: cleanStdout || stderr, isCorrect, unlockedAchievements: achievements };
    } catch (error) {
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            await PracticeTask.findByIdAndUpdate(id, { $inc: { attempts: 1 }, $set: { userCode: code } });
            return {
                output: 'Time Limit Exceeded: Перевищено ліміт часу (4.0с)',
                isCorrect: false,
            };
        }
        throw error;
    }
};
