import UserAchievement from '../models/userAchievement.js';
import UserStat from '../models/userStat.js';
import Achievement from '../models/achievement.js';

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
