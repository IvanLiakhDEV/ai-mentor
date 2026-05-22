import { Router } from 'express';
import { changePassword, editInfo, getLeaderboard, getMe, login, logout, refresh, register } from '../controllers/userController.js';
import { validateSchema } from '../middleware/validation.js';
import { changePasswordSchema, loginSchema, profileShema, registerSchema } from '../validators/userSchemas.js';
import { verifyJWT } from '../middleware/verifyUser.js';
export const userRouter = Router();

userRouter.post('/register', validateSchema(registerSchema), register);
userRouter.post('/login', validateSchema(loginSchema), login);
userRouter.post('/logout', verifyJWT, logout);
userRouter.post('/refresh', refresh);
userRouter.patch('/change-password', verifyJWT, validateSchema(changePasswordSchema), changePassword);
userRouter.patch('/profile', verifyJWT, validateSchema(profileShema), editInfo);
userRouter.get('/leaderboard', verifyJWT, getLeaderboard);
userRouter.get('/', verifyJWT, getMe);
