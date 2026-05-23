import User from '../models/user.js';
import UserStat from '../models/userStat.js';
import sharp from 'sharp';
import { ErrorHandler } from '../utils/errorHandlers.js';
import { getAccessToken, getRefreshToken, verifyRefreshToken } from './token.service.js';
export const createUser = async (username, email, password) => {
    const userExist = await User.findOne({ email });
    if (userExist) throw new ErrorHandler('Така пошта вже зареєстрована', 409);
    const usernameExist = await User.findOne({ username });
    if (usernameExist) throw new ErrorHandler('Цей нікнейм зайнятий', 409);
    const user = await User.create({ username, email, password });
    await UserStat.create({ userId: user._id });
    return user;
};
export const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new ErrorHandler('Користувача не знайдено', 404);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ErrorHandler('Невірний пароль', 401);

    const accessToken = getAccessToken(user);
    const refreshToken = getRefreshToken(user);

    await User.findByIdAndUpdate(user._id, { refreshToken });

    return { user, accessToken, refreshToken };
};
export const logoutUser = async userId => {
    const user = await User.findByIdAndUpdate(userId, { $set: { refreshToken: null } });
    if (!user) throw new ErrorHandler('Користувача не знайдено', 404);
};
export const editProfile = async ({ userId, data, avatar }) => {
    const updateFields = {};
    if (data.username != undefined) {
        const usernameExist = await User.findOne({
            username: data.username,
            _id: { $ne: userId },
        });
        if (usernameExist) throw new ErrorHandler('Цей нікнейм зайнятий', 409);
        updateFields.username = data.username;
    }
    if (data.about != undefined) updateFields.about = data.about;
    if (avatar != undefined) {
        const buffer = await sharp(avatar.buffer).resize(250, 250, { fit: 'cover', position: 'center' }).webp({ quality: 80 }).toBuffer();
        const base64Image = `data:image/webp;base64,${buffer.toString('base64')}`;
        updateFields.avatar = base64Image;
    }

    const user = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true });
    if (!user) throw new ErrorHandler('Користувача не знайдено', 404);
    return user;
};
export const renewTokens = async oldToken => {
    if (!oldToken) throw new ErrorHandler('Токен не дісний', 401);
    verifyRefreshToken(oldToken);
    const user = await User.findOne({ refreshToken: oldToken });
    if (!user) throw new ErrorHandler('Користувача не знайдено', 404);
    const accessToken = getAccessToken(user);
    const refreshToken = getRefreshToken(user);
    await User.findByIdAndUpdate(user._id, { refreshToken });
    return { user, accessToken, refreshToken };
};
export const setPassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findOne(userId).select('+password');
    if (!user) throw new ErrorHandler('Користувача не знайдено', 404);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new ErrorHandler('Введений пароль не збігається з паролем облікового запису', 400);
    user.password = newPassword;
    user.save();
};
export const getUser = async userId => {
    const user = await User.findById(userId);
    if (!user) throw new ErrorHandler('Користувача не знайдено', 404);
    return user;
};
export const getLeaderboardData = async () => {
    const result = await UserStat.aggregate([
        {
            $facet: {
                leaderboard: [
                    { $sort: { points: -1 } },
                    { $limit: 20 },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'userDetails',
                        },
                    },
                    {
                        $project: {
                            username: { $arrayElemAt: ['$userDetails.username', 0] },
                            points: 1,
                            coursesCompleted: 1,
                            currentStreak: 1,
                        },
                    },
                ],
                overallStats: [
                    {
                        $group: {
                            _id: null,
                            totalPointsAllUsers: { $sum: '$points' },
                            totalUsers: { $sum: 1 },
                        },
                    },
                ],
            },
        },
    ]);

    return {
        leaderboard: result[0].leaderboard,
        totalPoints: result[0].overallStats[0]?.totalPointsAllUsers || 0,
        totalUsers: result[0].overallStats[0]?.totalUsers || 0,
    };
};
