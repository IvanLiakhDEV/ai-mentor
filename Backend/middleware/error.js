import { ErrorHandler } from '../utils/errorHandlers.js';

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map(value => value.message)
            .join(', ');
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({ success: false, message: err.message });
};
