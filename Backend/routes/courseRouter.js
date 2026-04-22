import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { courseValidationSchema, byIdValidationSchema } from '../validators/educationSchema.js';
import { create, remove } from '../controllers/courseController.js';
import { validateSchema, validateParamsSchema } from '../middleware/validation.js';
export const courseRouter = Router();

courseRouter.post('/', verifyJWT, validateSchema(courseValidationSchema), create);
courseRouter.delete('/:id', verifyJWT, validateParamsSchema(byIdValidationSchema), remove);
