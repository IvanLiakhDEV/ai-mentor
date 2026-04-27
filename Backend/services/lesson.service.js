import Lesson from '../models/lesson.js';
import Course from '../models/course.js';

import { ErrorHandler } from '../utils/errorHandlers.js';
export const createLesson = async data => {
    const course = await Course.findById(data.courseId);
    if (!course) {
        throw new ErrorHandler(`Курсу з id = ${data.courseId} не існує`, 404);
    }
    if (!course.modules.id(data.moduleId)) {
        throw new ErrorHandler(`Модуля з id = ${data.moduleId} не існує`, 404);
    }
    const lesson = await Lesson.create(data);
    return lesson;
};
export const deleteLesson = async id => {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
        throw new ErrorHandler(`Уроку з id = ${id} не існує`, 404);
    }
    const result = Lesson.findByIdAndDelete(id);
    return result;
};
