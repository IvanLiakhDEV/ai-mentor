import { Router } from 'express';
import { authorize, verifyJWT } from '../middleware/verifyUser.js';
import {
    courseValidationSchema,
    byIdValidationSchema,
    moduleValidationSchema,
    editModuleValidationSchema,
} from '../validators/educationSchema.js';
import { addModule, create, deleteModule, editCourse, editModule, getAll, getById, remove } from '../controllers/courseController.js';
import { validateSchema, validateParamsSchema } from '../middleware/validation.js';
export const courseRouter = Router();

courseRouter.post('/', verifyJWT, authorize('admin'), validateSchema(courseValidationSchema), create);
courseRouter.delete('/:id', verifyJWT, authorize('admin'), validateParamsSchema(byIdValidationSchema), remove);
courseRouter.get('/', verifyJWT, getAll);
courseRouter.get('/:id', verifyJWT, validateParamsSchema(byIdValidationSchema), getById);
courseRouter.patch(
    '/:id',
    verifyJWT,
    authorize('admin'),
    validateParamsSchema(byIdValidationSchema),
    validateSchema(courseValidationSchema),
    editCourse,
);
courseRouter.post(
    '/:id/modules',
    verifyJWT,
    authorize('admin'),
    validateParamsSchema(byIdValidationSchema),
    validateSchema(moduleValidationSchema),
    addModule,
);
courseRouter.patch(
    '/:id/modules',
    verifyJWT,
    authorize('admin'),
    validateParamsSchema(byIdValidationSchema),
    validateSchema(editModuleValidationSchema),
    editModule,
);
courseRouter.delete('/:id/modules', verifyJWT, authorize('admin'), validateParamsSchema(byIdValidationSchema), deleteModule);
