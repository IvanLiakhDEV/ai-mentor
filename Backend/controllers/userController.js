import { catchAsyncErrors } from '../utils/errorHandlers.js';
import { authenticateUser, createUser, logoutUser, renewTokens, setPassword } from '../services/user.service.js';
import { sendTokens, clearTokens } from '../utils/tokens.js';

export const register = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);
    res.status(201).json({
        success: true,
        message: 'Користувача створено',
        data: user,
    });
});
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authenticateUser(email, password);
    sendTokens(res, accessToken, refreshToken);
    res.status(200).json({
        success: true,
        message: 'Авторизація успішна',
        data: user,
    });
});
export const logout = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    await logoutUser(userId);
    clearTokens(res);
    res.status(200).json({
        success: true,
        message: 'Успішне завершення сесії',
    });
});
export const refresh = catchAsyncErrors(async (req, res, next) => {
    const oldRefreshToken = req.cookies.refreshToken;
    const { user, accessToken, refreshToken } = await renewTokens(oldRefreshToken);
    sendTokens(res, accessToken, refreshToken);
    res.status(200).json({
        success: true,
        message: 'Успішне оновлення токену',
    });
});
export const changePassword = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    await setPassword(userId, currentPassword, newPassword);
    res.status(200).json({
        success: true,
        message: 'Пароль успішно оновлено',
    });
});
