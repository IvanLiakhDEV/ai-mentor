import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyUser.js';
import { validateSchema } from '../middleware/validation.js';
import { questionValidationSchema } from '../validators/aiSchema.js';
import { askQuestion } from '../controllers/aiController.js';
export const aiRouter = Router();

aiRouter.post('/ask', verifyJWT, validateSchema(questionValidationSchema), askQuestion);
