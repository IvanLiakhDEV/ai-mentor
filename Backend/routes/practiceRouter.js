import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyUser.js';
import { validateSchema } from '../middleware/validation.js';
import { taskValidationSchema } from '../validators/taskSchema.js';
import { createPracticeTask, getPracticeTasks } from '../controllers/practiceController.js';
export const practiceRouter = Router();

practiceRouter.get('/my-tasks', verifyJWT, getPracticeTasks);
practiceRouter.post('/', verifyJWT, validateSchema(taskValidationSchema), createPracticeTask);
