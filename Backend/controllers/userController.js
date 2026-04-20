import { catchAsyncErrors } from '../utils/errorHandlers.js';
import { registerUser } from '../services/user.service.js';
import { sendTokens } from '../utils/sendTokens.js';

export const createUser = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json({
        success: true,
        message: 'Користувача створено',
        data: user,
    });
});
export const authorizeUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(email, password);
    sendTokens(res, accessToken, refreshToken);
    res.status(200).json({
        success: true,
        message: 'Авторизація успішна',
        accessToken,
        data: user,
    });
});
