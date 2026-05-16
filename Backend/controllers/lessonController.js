import { createLesson, deleteLesson, editLessonInfo, getLessonById, reorderLessonsService } from '../services/lesson.service.js';
import { catchAsyncErrors } from '../utils/errorHandlers.js';
import { executeCode } from '../services/code.service.js';
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
export const editLesson = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { lesson } = req.body;

    const result = await editLessonInfo({ id, lesson });
    res.status(201).json({
        success: true,
        message: `Урок відредаговано`,
    });
});
export const getLesson = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const result = await getLessonById(id, userId);
    res.status(201).json({
        success: true,
        message: `Урок знайдено`,
        data: result,
    });
});

export const submitCode = catchAsyncErrors(async (req, res) => {
    const { code, id } = req.body;
    const userId = req.user._id;

    const result = await executeCode(code, id, userId);

    res.status(200).json({
        success: true,
        message: result.isCorrect ? 'Урок пройдено' : 'Неправильна відповідь',
        data: result,
    });
});
export const reorderLessons = catchAsyncErrors(async (req, res) => {
    const { lessons } = req.body;
    await reorderLessonsService(lessons);
    res.status(200).json({ success: true, message: 'Урок переставлено' });
});
