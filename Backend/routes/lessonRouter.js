import { Router } from 'express';
import { validateParamsSchema, validateSchema } from '../middleware/validation.js';
import { authorize, verifyJWT } from '../middleware/verifyUser.js';
import { byIdValidationSchema, lessonValidationSchema, objectIdSchema } from '../validators/educationSchema.js';
import { addLesson, getLesson, removeLesson, submitCode } from '../controllers/lessonController.js';
export const lessonRouter = Router();

lessonRouter.post('/', verifyJWT, authorize('admin'), validateSchema(lessonValidationSchema), addLesson);
lessonRouter.post('/submit', verifyJWT, submitCode);
lessonRouter.get('/:id', verifyJWT, validateParamsSchema(byIdValidationSchema), getLesson);
lessonRouter.delete('/:id', verifyJWT, authorize('admin'), validateParamsSchema(byIdValidationSchema), removeLesson);
