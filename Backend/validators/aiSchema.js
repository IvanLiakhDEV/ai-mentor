// @ts-check
import { z } from 'zod';
import { issuesHandler } from '../middleware/validation.js';

export const questionValidationSchema = z.object({
    messages: z.array(
        z.object({
            message: z.string().trim().min(1, 'Повідомлення не може бути порожнім').max(5000, 'Повідомлення занадто довге'),
            isBot: z.boolean(),
        }),
    ),
    data: z.object({
        title: z
            .string(issuesHandler('title'))
            .trim()
            .min(5, 'Назва не може бути коротша за 5 символів')
            .max(100, 'Назва не може бути довша за 100 символів'),
        theory: z.object({
            content: z
                .string(issuesHandler('theory.content'))
                .min(1, 'Теорія не може бути порожньою')
                .max(5000, 'Теорія не може бути довша за 5000 символів'),
        }),
        practice: z.object({
            taskDescription: z.string(issuesHandler('practice.taskDescription')).min(1, "Опис завдання є обов'язковим"),
            initialCode: z.string(issuesHandler('practice.initialCode')).default(''),
            testCode: z.string(issuesHandler('practice.testCode')).optional(),
        }),
    }),
    code: z.string(issuesHandler('code')).max(2000, 'Код занадто довгий'),
});
