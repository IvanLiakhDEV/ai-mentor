import { ErrorHandler } from '../utils/errorHandlers.js';

export const validateSchema = schema => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.issues[0].message;
        return next(new ErrorHandler(message, 400));
    }
    req.body = result.data;
    next();
};
