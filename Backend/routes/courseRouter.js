import { Router } from 'express';
import { authorize, verifyJWT } from '../middleware/verifyUser.js';
import { courseValidationSchema, byIdValidationSchema, moduleValidationSchema } from '../validators/educationSchema.js';
import { addModule, create, getAll, getById, remove } from '../controllers/courseController.js';
import { validateSchema, validateParamsSchema } from '../middleware/validation.js';
export const courseRouter = Router();

courseRouter.post('/', verifyJWT, authorize('admin'), validateSchema(courseValidationSchema), create);
courseRouter.delete('/:id', verifyJWT, authorize('admin'), validateParamsSchema(byIdValidationSchema), remove);
courseRouter.get('/', verifyJWT, getAll);
courseRouter.get('/:id', verifyJWT, validateParamsSchema(byIdValidationSchema), getById);
courseRouter.post(
    '/:id/modules',
    verifyJWT,
    authorize('admin'),
    validateParamsSchema(byIdValidationSchema),
    validateSchema(moduleValidationSchema),
    addModule,
);
