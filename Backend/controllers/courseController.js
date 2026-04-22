import { createCourse, removeCourse } from '../services/course.service.js';
import { catchAsyncErrors } from '../utils/errorHandlers.js';
export const create = catchAsyncErrors(async (req, res, next) => {
    const courseData = req.body;
    const result = await createCourse(courseData);
    res.status(201).json({
        success: true,
        message: 'Курс створено успішно',
        data: result,
    });
});
export const remove = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    await removeCourse(id);
    res.status(200).json({
        success: true,
        message: `Курс з id = "${id}" видалено успішно`,
    });
});
