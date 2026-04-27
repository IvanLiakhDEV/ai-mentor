import Course from '../models/course.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
export const createCourse = async data => {
    const { title } = data;
    const courseExist = await Course.findOne({ title });
    if (courseExist) {
        throw new ErrorHandler('Курс з такою самою назвою вже існує', 409);
    }
    const course = await Course.create(data);
    return course;
};
export const removeCourse = async id => {
    const result = await Course.findByIdAndDelete(id);
    if (!result) {
        throw new ErrorHandler(`Курсу з id = "${id}" не знайдено`, 404);
    }
};
export const getCourse = async id => {
    const result = await Course.findById(id);
    if (!result) {
        throw new ErrorHandler(`Курсу з id = "${id}" не знайдено`, 404);
    }
    return result;
};
export const getCourses = async () => {
    const result = await Course.find();
    return result;
};
export const addModuleToCourse = async (moduleData, courseId) => {
    const courseExist = await Course.findById(courseId);
    if (!courseExist) {
        throw new ErrorHandler(`Курсу з id = "${courseId}" не знайдено`, 404);
    }

    const result = await Course.findByIdAndUpdate(courseId, { $push: { modules: moduleData } }, { returnDocument: 'after' });
    return result;
};
