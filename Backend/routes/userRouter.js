import { Router } from 'express';
import { authorizeUser, createUser } from '../controllers/userController.js';
export const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.post('/login', authorizeUser);
