import { toggleArchived, createEnrollment, getUserEnrollments, incrementProgress } from '../services/enrollment.service.js';
import { catchAsyncErrors } from '../utils/errorHandlers.js';
export const startCourse = catchAsyncErrors(async (req, res, next) => {
    const { courseId } = req.body;
    const userId = req.user._id;
    const result = await createEnrollment(courseId, userId);
    res.status(200).json({
        success: true,
        message: `Користувача зараховано до курсу з id="${courseId}"`,
        data: result,
    });
});
export const getMyEnrollments = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const result = await getUserEnrollments(userId);
    res.status(200).json({
        success: true,
        message: `Кількість курсів до яких користувач зарахований: ${result.length}`,
        data: result,
    });
});
export const updateCourseProgress = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const result = await incrementProgress(userId, id);
    res.status(200).json({
        success: true,
        data: result,
    });
});
export const archiveCourse = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const result = await toggleArchived(userId, id);
    res.status(200).json({
        success: true,
        message: `Курс ${result.archived ? 'архівовано' : 'розархівовано'}`,
        data: result,
    });
});
