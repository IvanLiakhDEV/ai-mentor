import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/DB.js';
dotenv.config();

const app = express();

app.use(json());

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running`);
    connectDB();
});
