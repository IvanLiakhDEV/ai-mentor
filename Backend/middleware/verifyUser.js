import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { catchAsyncErrors } from '../utils/errorHandlers.js';
import { ErrorHandler } from '../utils/errorHandlers.js';
import { verifyAccessToken } from '../services/token.service.js';
import { getUser } from '../services/user.service.js';
export const verifyJWT = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) throw new ErrorHandler('Спочатку авторизуйтеся', 401);
    const decoded = verifyAccessToken(token);
    const user = await getUser(decoded.id);
    req.user = user;
    next();
});

export const authorize =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ErrorHandler('Немає доступу', 403);
        }
        next();
    };
