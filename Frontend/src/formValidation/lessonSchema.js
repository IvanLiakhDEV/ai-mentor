import { z } from 'zod';

export const objectIdSchema = fieldName =>
    z.string().regex(/^[0-9a-fA-F]{24}$/, `Невалідний ідентифікатор (ObjectId) для поля ${fieldName}`);

export const lessonValidationSchema = z.object({
    courseId: objectIdSchema('courseId'),
    moduleId: objectIdSchema('moduleId'),
    title: z.string().trim().min(5, 'Назва не може бути коротша за 5 символів').max(100, 'Назва не може бути довша за 100 символів'),
    theory: z.object({
        content: z.string().min(1, 'Теорія не може бути порожньою').max(5000, 'Теорія не може бути довша за 5000 символів'),
    }),
    points: z.number().nonnegative('Кількість очок не може бути від`ємна').optional(),
    practice: z.object({
        taskDescription: z.string().min(1, "Опис завдання є обов'язковим"),
        initialCode: z.string().default('').optional(),
        testCode: z.string(),
    }),
});
