import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyUser.js';
import { validateSchema } from '../middleware/validation.js';
import { taskValidationSchema, userCodeValidation } from '../validators/taskSchema.js';
import { createPracticeTask, getPracticeTasks, getTask, submitUserCode } from '../controllers/practiceController.js';
export const practiceRouter = Router();

practiceRouter.get('/my-tasks', verifyJWT, getPracticeTasks);
practiceRouter.get('/:id', verifyJWT, getTask);
practiceRouter.post('/', verifyJWT, validateSchema(taskValidationSchema), createPracticeTask);
practiceRouter.post('/submit/:id', verifyJWT, validateSchema(userCodeValidation), submitUserCode);
