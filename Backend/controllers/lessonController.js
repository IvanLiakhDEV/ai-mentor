import { createLesson, deleteLesson } from '../services/lesson.service.js';
import { catchAsyncErrors } from '../utils/errorHandlers.js';
export const addLesson = catchAsyncErrors(async (req, res, next) => {
    const data = req.body;
    const result = await createLesson(data);
    res.status(201).json({
        success: true,
        message: `Урок додано`,
        data: result,
    });
});
export const removeLesson = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteLesson(id);
    res.status(201).json({
        success: true,
        message: `Урок видалено`,
        data: result,
    });
});
