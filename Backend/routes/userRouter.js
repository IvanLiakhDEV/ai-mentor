import { Router } from 'express';
import { login, register } from '../controllers/userController.js';
import { validateSchema } from '../middleware/validation.js';
import { loginSchema, registerSchema } from '../validators/userSchemas.js';
export const userRouter = Router();

userRouter.post('/register', validateSchema(registerSchema), register);
userRouter.post('/login', validateSchema(loginSchema), login);
