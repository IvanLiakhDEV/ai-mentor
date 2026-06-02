import UserAchievement from '../models/userAchievement.js';
import UserStat from '../models/userStat.js';
import Achievement from '../models/achievement.js';
import Enrollment from '../models/enrollment.js';

export const getUserAchievements = async userId => {
    return await UserAchievement.find({ userId })
        .populate('achievementId', 'code title description iconUrl xpReward')
        .sort({ unlockedAt: -1 });
};

export const getUserStats = async userId => {
    return await UserStat.findOne({ userId });
};

export const getAllAchievements = async () => {
    return await Achievement.find({});
};

export const checkAndUnlockAchievements = async ({ userId, updatedStats }) => {
    const newlyUnlocked = [];
    const achievementConditions = [
        { conditionType: 'lessons_completed', targetValue: { $lte: updatedStats.lessonsCompleted } },
        { conditionType: 'courses_completed', targetValue: { $lte: updatedStats.coursesCompleted } },
        { conditionType: 'points_earned', targetValue: { $lte: updatedStats.points } },
        { conditionType: 'day_streak', targetValue: { $lte: updatedStats.currentStreak } },
    ];
    if (new Date().getHours() < 4) {
        achievementConditions.push({
            conditionType: 'night_lesson_completed',
            targetValue: { $lte: 1 },
        });
    }
    const availableAchievements = await Achievement.find({ $or: achievementConditions });
    for (const achievement of availableAchievements) {
        const { upsertedCount } = await UserAchievement.updateOne(
            { userId, achievementId: achievement._id },
            { $setOnInsert: { userId, achievementId: achievement._id } },
            { upsert: true },
        );
        if (upsertedCount) {
            newlyUnlocked.push(achievement);
            if (achievement.xpReward > 0) {
                await UserStat.findOneAndUpdate({ userId }, { $inc: { points: achievement.xpReward } });
            }
        }
    }

    return newlyUnlocked;
};
