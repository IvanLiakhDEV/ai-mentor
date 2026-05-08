import Course from '../models/course.js';
import Lesson from '../models/lesson.js';
import Enrollment from '../models/enrollment.js';

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
export const getCourse = async (courseId, userId) => {
    const [course, lessons, enrollment] = await Promise.all([
        Course.findById(courseId),
        Lesson.find({ courseId }).sort({ sequenceNumber: 1 }),
        Enrollment.findOne({ courseId, userId }),
    ]);
    if (!course) throw new ErrorHandler('Курс не знайдено', 404);
    const modulesWithLessons = course.modules.map(module => ({
        ...module.toObject(),
        lessons: lessons.filter(lesson => lesson.moduleId.toString() === module._id.toString()),
    }));
    return {
        ...course.toObject(),
        modules: modulesWithLessons,
        numberOfLessons: lessons.length,
        isEnrolled: !!enrollment,
        enrollment: enrollment,
    };
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
