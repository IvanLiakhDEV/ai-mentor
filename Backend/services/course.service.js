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
    await Promise.all([Lesson.deleteMany({ courseId: id }), Enrollment.deleteMany({ courseId: id })]);
};
export const editCourseInfo = async ({ id, data }) => {
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            tags: data.tags,
        },
    });
    if (!result) {
        throw new ErrorHandler(`Курсу з id = "${id}" не знайдено`, 404);
    }
};
export const getCourse = async (courseId, userId, role = 'student') => {
    const [course, lessons, enrollment] = await Promise.all([
        role === 'student' ? Course.findOne({ _id: courseId, isArchived: { $ne: true } }) : Course.findById(courseId),
        Lesson.find({ courseId }).sort({ sequenceNumber: 1 }),
        Enrollment.findOne({ courseId, userId }),
    ]);
    if (!course) throw new ErrorHandler('Курс не знайдено або він недоступний', 404);
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
export const getCoursesInfo = async ({ role, userId, search, difficulty, enrolled, page, limit }) => {
    const query = role === 'student' ? { isArchived: { $ne: true } } : {};
    if (search) {
        query.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    }
    if (difficulty) {
        query.difficulty = difficulty;
    }
    if (enrolled !== undefined) {
        const enrollments = await Enrollment.find({ userId }).select('courseId');
        const courseIds = enrollments.map(e => e.courseId);
        query._id = enrolled === 'true' ? { $in: courseIds } : { $nin: courseIds };
    }
    const skip = (page - 1) * limit;
    const [courses, total] = await Promise.all([Course.find(query).skip(skip).limit(Number(limit)), Course.countDocuments(query)]);
    return {
        courses,
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number(page),
    };
};
export const addModuleToCourse = async (moduleData, courseId) => {
    const courseExist = await Course.findById(courseId);
    if (!courseExist) {
        throw new ErrorHandler(`Курсу з id = "${courseId}" не знайдено`, 404);
    }
    const result = await Course.findByIdAndUpdate(courseId, { $push: { modules: moduleData } }, { returnDocument: 'after' });
    return result;
};
export const editModuleInfo = async ({ id, data }) => {
    const result = await Course.findOneAndUpdate(
        {
            _id: id,
            'modules._id': data.moduleId,
        },
        {
            $set: {
                'modules.$.title': data.title,
                'modules.$.order': data.order,
            },
        },
        { returnDocument: 'after' },
    );

    if (!result) {
        throw new ErrorHandler('Курс або модуль не знайдено', 404);
    }
    return result;
};
export const removeModule = async ({ id }) => {
    const result = await Course.findOneAndUpdate({ 'modules._id': id }, { $pull: { modules: { _id: id } } }, { new: true });
    if (!result) {
        throw new ErrorHandler('Модуль не знайдено', 404);
    }
    await Lesson.deleteMany({ moduleId: id });
};
export const toggleArchivedCourse = async ({ id }) => {
    const result = await Course.findByIdAndUpdate(id, [{ $set: { isArchived: { $not: '$isArchived' } } }], {
        new: true,
        updatePipeline: true,
    });
    if (!result) {
        throw new ErrorHandler('Курс не знайдено', 404);
    }
    return result;
};
