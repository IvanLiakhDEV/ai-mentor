import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyUser.js';
import { getAchievements, getMyProfileAchievments } from '../controllers/achivmentController.js';
export const achievementRouter = Router();
achievementRouter.get('/my', verifyJWT, getMyProfileAchievments);
achievementRouter.get('/', verifyJWT, getAchievements);
