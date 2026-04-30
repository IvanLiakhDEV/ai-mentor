import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/DB.js';
import { userRouter } from './routes/UserRouter.js';
import { errorMiddleware } from './middleware/error.js';
import cookieParser from 'cookie-parser';
import { courseRouter } from './routes/courseRouter.js';
import { enrollmentRouter } from './routes/enrollmentRouter.js';
import { lessonRouter } from './routes/lessonRouter.js';

dotenv.config();

const app = express();

app.use(json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);

app.use(cookieParser());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/enrollments', enrollmentRouter);
app.use('/lesson', lessonRouter);

app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running`);
    connectDB();
});
