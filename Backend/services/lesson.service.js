import Lesson from '../models/lesson.js';
import Course from '../models/course.js';
import Enrollment from '../models/enrollment.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
export const createLesson = async data => {
    const { moduleId, courseId } = data;

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ErrorHandler(`Курсу з id = ${data.courseId} не існує`, 404);
    }
    if (!course.modules.id(moduleId)) {
        throw new ErrorHandler(`Модуля з id = ${data.moduleId} не існує`, 404);
    }
    const count = await Lesson.countDocuments({ moduleId });

    const lesson = await Lesson.create({
        ...data,
        sequenceNumber: count + 1,
    });
    return lesson;
};
export const deleteLesson = async lessonId => {
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) throw new ErrorHandler('Урок не знайдено', 404);
    const lessons = await Lesson.find({ moduleId: lesson.moduleId }).sort({ sequenceNumber: 1 });
    await Promise.all(lessons.map((l, index) => Lesson.findByIdAndUpdate(l._id, { sequenceNumber: index + 1 })));
};

export const getLessonById = async (lessonId, userId) => {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw new ErrorHandler('Урок не знайдено', 404);
    const enrollment = await Enrollment.findOne({
        courseId: lesson.courseId,
        userId,
    });
    if (!enrollment) throw new ErrorHandler('Ви не записані на цей курс', 403);

    if (lesson.sequenceNumber > enrollment.completedSequence + 1) {
        throw new ErrorHandler('Спочатку пройдіть попередні уроки', 403);
    }

    return lesson;
};

export const reorderLessonsService = async lessons => {
    await Lesson.bulkWrite(
        lessons.map(({ _id, sequenceNumber }) => ({
            updateOne: {
                filter: { _id },
                update: { $set: { sequenceNumber } },
            },
        })),
    );
};
