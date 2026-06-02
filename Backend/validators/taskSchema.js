// @ts-check
import { z } from 'zod';
import { issuesHandler } from '../middleware/validation.js';

export const objectIdSchema = fieldName =>
    z.string(issuesHandler(fieldName)).regex(/^[0-9a-fA-F]{24}$/, `Невалідний ідентифікатор (ObjectId) для поля ${fieldName}`);

export const taskValidationSchema = z.object({
    topic: z
        .string(issuesHandler('topic'))
        .trim()
        .min(3, 'Тема не може бути коротшою за 3 символи')
        .max(100, 'Тема не може бути довшою за 100 символів'),
    difficulty: z.enum(['easy', 'medium', 'hard'], issuesHandler('difficulty')),
    language: z
        .enum(['typescript', 'javascript', 'python', 'java', 'dart', 'ruby', 'cpp', 'c', 'csharp', 'sql', 'php'], issuesHandler('language'))
        .default('javascript'),
});
export const userCodeValidation = z.object({
    code: z.string(),
});
