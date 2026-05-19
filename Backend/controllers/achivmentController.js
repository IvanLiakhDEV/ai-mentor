import { getAllAchievements, getUserAchievements, getUserStats } from '../services/achievement.service.js';
import { catchAsyncErrors } from '../utils/errorHandlers.js';
export const getMyProfileAchievments = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const [achievements, stats] = await Promise.all([getUserAchievements(userId), getUserStats(userId)]);
    res.status(200).json({
        success: true,
        data: { achievements, stats },
    });
});
export const getAchievements = catchAsyncErrors(async (req, res, next) => {
    const result = await getAllAchievements();
    res.status(200).json({
        success: true,
        data: result,
    });
});
