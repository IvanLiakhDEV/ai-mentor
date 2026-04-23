// @ts-check
import { z } from 'zod';
import { issuesHandler } from '../middleware/validation.js';

export const objectIdSchema = fieldName =>
    z.string(issuesHandler(fieldName)).regex(/^[0-9a-fA-F]{24}$/, `Невалідний ідентифікатор (ObjectId) для поля ${fieldName}`);

export const courseValidationSchema = z.object({
    title: z
        .string(issuesHandler('title'))
        .trim()
        .min(10, 'Назва не може бути коротша за 10 символів')
        .max(100, 'Назва не може бути довша за 100 символів'),
    description: z
        .string(issuesHandler('description'))
        .trim()
        .min(50, 'Опис не може бути коротшим за 50 символів')
        .max(500, 'Опис не може бути довшим за 500 символів'),
    tags: z
        .array(z.string(issuesHandler('tags.item')).max(30, 'Тег не може бути довшим за 30 символів'), issuesHandler('tags'))
        .nonempty('Додайте хоча б 1 тег'),

    modules: z
        .array(
            z.object({
                title: z.string(issuesHandler('modules.title')).min(1, "Назва модуля є обов'язковою"),
                order: z.number(issuesHandler('modules.order')),
            }),
            issuesHandler('modules'),
        )
        .optional(),
});
export const byIdValidationSchema = z.object({
    id: objectIdSchema('id'),
});

export const enrollmentValidationSchema = z.object({
    courseId: objectIdSchema('courseId'),
    completedSequence: z.number(issuesHandler('completedSequence')).nonnegative().default(0),
    status: z.enum(['Active', 'Completed'], issuesHandler('status')).default('Active'),
    archived: z.boolean(issuesHandler('archived')).default(false),
});

export const lessonValidationSchema = z.object({
    courseId: objectIdSchema('courseId'),
    moduleId: objectIdSchema('moduleId'),
    sequenceNumber: z.number(issuesHandler('sequenceNumber')).nonnegative(),
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
        expectedOutput: z.string(issuesHandler('practice.expectedOutput')).optional(),
    }),
});
