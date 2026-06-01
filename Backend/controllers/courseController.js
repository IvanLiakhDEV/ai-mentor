import {
    addModuleToCourse,
    createCourse,
    editCourseInfo,
    editModuleInfo,
    getCourse,
    getCourses,
    removeCourse,
    removeModule,
    toggleArchivedCourse,
} from '../services/course.service.js';
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
export const editCourse = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    await editCourseInfo({ id, data });
    res.status(200).json({
        success: true,
        message: `Курс з id = "${id}" видалено успішно`,
    });
});
export const getAll = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    const result = await getCourses({ role });
    res.status(200).json({
        success: true,
        message: `Курсів знайдено: ${result.length}`,
        data: result,
    });
});
export const getById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const result = await getCourse(id, userId);
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
export const editModule = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    const result = await editModuleInfo({ id, data });
    res.status(200).json({
        success: true,
        message: `Модуль відредаговано`,
        data: result,
    });
});
export const deleteModule = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    await removeModule({ id });
    res.status(200).json({
        success: true,
        message: `Модуль видалено`,
    });
});
export const toggleArchived = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const result = await toggleArchivedCourse({ id });
    res.status(200).json({
        success: true,
        message: `Курс ${result.isArchived ? 'Розархівовано' : 'Заархівовано'}`,
    });
});
