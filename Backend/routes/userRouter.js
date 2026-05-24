import { Router } from 'express';
import {
    changePassword,
    editInfo,
    getLeaderboard,
    getMe,
    getProfile,
    login,
    logout,
    refresh,
    register,
} from '../controllers/userController.js';
import { validateParamsSchema, validateSchema } from '../middleware/validation.js';
import { changePasswordSchema, loginSchema, profileShema, registerSchema } from '../validators/userSchemas.js';
import { byIdValidationSchema } from '../validators/educationSchema.js';
import { verifyJWT } from '../middleware/verifyUser.js';
export const userRouter = Router();
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });
userRouter.post('/register', validateSchema(registerSchema), register);
userRouter.post('/login', validateSchema(loginSchema), login);
userRouter.post('/logout', verifyJWT, logout);
userRouter.post('/refresh', refresh);
userRouter.patch('/change-password', verifyJWT, validateSchema(changePasswordSchema), changePassword);
userRouter.patch('/profile', verifyJWT, upload.single('avatar'), validateSchema(profileShema.partial()), editInfo);
userRouter.get('/leaderboard', verifyJWT, getLeaderboard);
userRouter.get('/', verifyJWT, getMe);
userRouter.get('/:id', verifyJWT, validateParamsSchema(byIdValidationSchema), getProfile);
