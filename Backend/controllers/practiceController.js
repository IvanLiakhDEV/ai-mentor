import { catchAsyncErrors } from '../utils/errorHandlers.js';
import { createTask, getMyTasks, getTaskInfo, submitTask } from '../services/practice.service.js';
export const getPracticeTasks = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const { isCompleted, difficulty, page = '1', limit = '5' } = req.query;
    const tasks = await getMyTasks({ userId, isCompleted, difficulty, page, limit });
    res.status(200).json(tasks);
});
export const createPracticeTask = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const { topic, difficulty, language } = req.body;
    const task = await createTask({ userId, topic, difficulty, language });
    res.status(200).json(task);
});
export const getTask = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const task = await getTaskInfo({ id });
    res.status(200).json(task);
});
export const submitUserCode = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { code } = req.body;
    const task = await submitTask({ id, code });
    res.status(200).json(task);
});
