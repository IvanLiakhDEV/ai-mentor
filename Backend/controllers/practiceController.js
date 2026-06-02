import { catchAsyncErrors } from '../utils/errorHandlers.js';
import { createTask, getMyTasks } from '../services/practice.service.js';
export const getPracticeTasks = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const tasks = await getMyTasks({ userId });
    res.status(200).json(tasks);
});
export const createPracticeTask = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const { topic, difficulty, language } = req.body;
    const task = await createTask({ userId, topic, difficulty, language });
    res.status(200).json(task);
});
