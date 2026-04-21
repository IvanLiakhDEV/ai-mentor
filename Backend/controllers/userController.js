import { catchAsyncErrors } from '../utils/errorHandlers.js';
import { authenticateUser, createUser } from '../services/user.service.js';
import { sendTokens } from '../utils/sendTokens.js';

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
