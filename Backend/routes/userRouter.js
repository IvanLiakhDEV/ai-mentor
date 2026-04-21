import { Router } from 'express';
import { login, logout, register } from '../controllers/userController.js';
import { validateSchema } from '../middleware/validation.js';
import { loginSchema, registerSchema } from '../validators/userSchemas.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
export const userRouter = Router();

userRouter.post('/register', validateSchema(registerSchema), register);
userRouter.post('/login', validateSchema(loginSchema), login);
userRouter.post('/logout', verifyJWT, logout);
