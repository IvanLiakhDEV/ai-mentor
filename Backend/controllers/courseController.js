import { addModuleToCourse, createCourse, getCourse, getCourses, removeCourse } from '../services/course.service.js';
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
export const getAll = catchAsyncErrors(async (req, res, next) => {
    const result = await getCourses();
    res.status(200).json({
        success: true,
        message: `Курсів знайдено: ${result.length}`,
        data: result,
    });
});
export const getById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const result = await getCourse(id);
    res.status(200).json({
        success: true,
        message: `Курс з id = ${id} знайдено`,
        data: result,
    });
});
export const addModule = catchAsyncErrors(async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;
    const result = await addModuleToCourse(data, id);
    res.status(200).json({
        success: true,
        message: `Модуль додано успішно`,
        data: result,
    });
});
