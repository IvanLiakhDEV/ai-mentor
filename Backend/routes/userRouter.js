import { Router } from 'express';
import { changePassword, getMe, login, logout, refresh, register } from '../controllers/userController.js';
import { validateSchema } from '../middleware/validation.js';
import { changePasswordSchema, loginSchema, registerSchema } from '../validators/userSchemas.js';
import { verifyJWT } from '../middleware/verifyUser.js';
export const userRouter = Router();

userRouter.post('/register', validateSchema(registerSchema), register);
userRouter.post('/login', validateSchema(loginSchema), login);
userRouter.post('/logout', verifyJWT, logout);
userRouter.post('/refresh', refresh);
userRouter.patch('/change-password', verifyJWT, validateSchema(changePasswordSchema), changePassword);
userRouter.get('/', verifyJWT, getMe);
