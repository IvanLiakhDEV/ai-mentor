import { askAI } from '../services/ai.service.js';
import { catchAsyncErrors } from '../utils/errorHandlers.js';
export const askQuestion = catchAsyncErrors(async (req, res, next) => {
    const { messages, lesson, code, chat } = req.body;
    const result = await askAI({ messages, lesson, code });
    res.status(200).json({ success: true, data: result });
});
