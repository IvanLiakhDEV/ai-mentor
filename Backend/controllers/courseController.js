import {
    addModuleToCourse,
    createCourse,
    editCourseInfo,
    editModuleInfo,
    getCourse,
    getCoursesInfo,
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
export const getCourses = catchAsyncErrors(async (req, res, next) => {
    const { role, _id: userId } = req.user;
    const { search, difficulty, enrolled, page = '1', limit = '6' } = req.query;
    const data = await getCoursesInfo({ role, userId, search, difficulty, enrolled, page, limit });
    res.status(200).json(data);
});
export const getById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { role } = req.user;
    const result = await getCourse(id, userId, role);
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
        message: `Курс ${result.isArchived ? 'Заархівовано' : 'Розархівовано'}`,
    });
});
