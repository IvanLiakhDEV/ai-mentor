import { ErrorHandler } from '../utils/errorHandlers.js';

export const validateSchema = schema => (req, res, next) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
        const message = result.error.issues[0].message;
        return next(new ErrorHandler(message, 400));
    }
    req.body = result.data;
    next();
};
export const validateParamsSchema = schema => (req, res, next) => {
    const result = schema.safeParse(req.params ?? {});
    if (!result.success) {
        const message = result.error.issues[0].message;
        return next(new ErrorHandler(message, 400));
    }
    req.body = result.data;
    next();
};
export const issuesHandler = field => ({
    error: iss => {
        if (iss.input === undefined) return `Поле ${field} обов'язкове до заповнення`;
    },
});
