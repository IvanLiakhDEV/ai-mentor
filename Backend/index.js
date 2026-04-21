import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/DB.js';
import { userRouter } from './routes/UserRouter.js';
import { errorMiddleware } from './middleware/error.js';
dotenv.config();

const app = express();

app.use(json());
app.use('/user', userRouter);
app.use(errorMiddleware);
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running`);
    connectDB();
});
