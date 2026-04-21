import User from '../models/user.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
import { getAccessToken, getRefreshToken } from './token.service.js';
export const createUser = async (username, email, password) => {
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ErrorHandler('Така пошта вже зареєстрована', 409);
    }
    const user = await User.create({ username, email, password });
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
