import Enrollment from '../models/enrollment.js';
import Course from '../models/course.js';
import Lesson from '../models/lesson.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
export const createEnrollment = async (courseId, userId) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ErrorHandler(`Курсу з id = ${courseId} не існує`, 404);
    }
    const enrollmentExist = await Enrollment.findOne({ userId, courseId });
    if (enrollmentExist) {
        throw new ErrorHandler(`Користувач вже є учасником курсу`, 409);
    }
    const enrollment = await Enrollment.create({ courseId, userId });
    await Course.findByIdAndUpdate(courseId, { $inc: { numOfParticipants: 1 } });
    return enrollment;
};
export const getUserEnrollments = async userId => {
    const enrollments = await Enrollment.find({ userId }).populate('courseId', 'title description tags language modules');
    const enrollmentsWithProgress = await Promise.all(
        enrollments.map(async enrollment => {
            const totalLessons = await Lesson.countDocuments({
                courseId: enrollment.courseId._id,
            });

            return {
                ...enrollment.toObject(),
                totalLessons,
                progress: totalLessons > 0 ? Math.round((enrollment.completedSequence / totalLessons) * 100) : 0,
            };
        }),
    );
    return enrollmentsWithProgress;
};

export const incrementProgress = async (userId, enrollmentId) => {
    const enrollments = await Enrollment.findOneAndUpdate(
        { _id: enrollmentId, userId },
        { $inc: { completedSequence: 1 } },
        { returnDocument: 'after' },
    );
    return enrollments;
};
export const toggleArchived = async (userId, enrollmentId) => {
    const enrollment = await Enrollment.findOneAndUpdate({ _id: enrollmentId, userId }, [{ $set: { archived: { $not: '$archived' } } }], {
        returnDocument: 'after',
        updatePipeline: true,
    });
    return enrollment;
};
