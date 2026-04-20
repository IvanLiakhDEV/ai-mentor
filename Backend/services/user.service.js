import User from '../models/user.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
import { getAccessToken, getRefreshToken } from './token.service.js';
export const registerUser = async ({ username, email, password }) => {
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ErrorHandler('Така пошта вже зареєстрована', 409);
    }
    const user = await User.create({ username, email, password });
    user.password = undefined;
    return user;
};
export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new ErrorHandler('Користувача не знайдено', 404);
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ErrorHandler('Заповніть поля', 500);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ErrorHandler('Невірний пароль', 401);
    }
    const accessToken = getAccessToken(user);
    const refreshToken = getRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    return { user, accessToken, refreshToken };
};
