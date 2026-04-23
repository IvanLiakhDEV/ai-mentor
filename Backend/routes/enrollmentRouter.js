import { Router } from 'express';
import { validateParamsSchema, validateSchema } from '../middleware/validation.js';
import { verifyJWT } from '../middleware/verifyUser.js';
import { byIdValidationSchema, enrollmentValidationSchema, objectIdSchema } from '../validators/educationSchema.js';
import { archiveCourse, getMyEnrollments, startCourse, updateCourseProgress } from '../controllers/enrollmentController.js';
export const enrollmentRouter = Router();

enrollmentRouter.post('/', verifyJWT, validateSchema(enrollmentValidationSchema), startCourse);
enrollmentRouter.get('/my', verifyJWT, getMyEnrollments);
enrollmentRouter.patch('/:id/progress', verifyJWT, validateParamsSchema(byIdValidationSchema), updateCourseProgress);
enrollmentRouter.patch('/:id/archive', verifyJWT, validateParamsSchema(byIdValidationSchema), archiveCourse);
