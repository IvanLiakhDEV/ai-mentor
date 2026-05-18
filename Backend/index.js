import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/DB.js';
import { userRouter } from './routes/userRouter.js';
import { errorMiddleware } from './middleware/error.js';
import cookieParser from 'cookie-parser';
import { courseRouter } from './routes/courseRouter.js';
import { enrollmentRouter } from './routes/enrollmentRouter.js';
import { lessonRouter } from './routes/lessonRouter.js';
import { aiRouter } from './routes/aiRouter.js';

dotenv.config();
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;
const app = express();

app.use(json());
app.use(
    cors({
        origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
        credentials: true,
    }),
);

app.use(cookieParser());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/enrollments', enrollmentRouter);
app.use('/lesson', lessonRouter);
app.use('/chat', aiRouter);

app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
