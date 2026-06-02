import PracticeTask from '../models/PracticeTask.js';
import { generateTask } from './ai.service.js';

export const getMyTasks = async ({ userId }) => {
    return await PracticeTask.find({ userId }).sort({ createdAt: -1 });
};
export const createTask = async ({ userId, topic, difficulty, language }) => {
    const task = await generateTask({ topic, difficulty, language });
    const createdTask = await PracticeTask.create({ ...task, topic, difficulty, language, userId });
    return createdTask;
};
