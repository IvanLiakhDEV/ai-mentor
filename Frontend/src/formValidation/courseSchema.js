import { z } from 'zod';

export const courseValidationSchema = z.object({
    title: z.string().trim().min(10, 'Назва не може бути коротша за 10 символів').max(100, 'Назва не може бути довша за 100 символів'),
    description: z
        .string()
        .trim()
        .min(50, 'Опис не може бути коротшим за 50 символів')
        .max(500, 'Опис не може бути довшим за 500 символів'),
    tags: z
        .string()
        .trim()
        .min(1, 'Додайте хоча б 1 тег')
        .transform(val => val.split(/\s+/).filter(Boolean))
        .pipe(z.array(z.string().max(30, 'Тег не може бути довшим за 30 символів')).nonempty('Додайте хоча б 1 тег')),
    modules: z
        .array(
            'Додайте хоча б 1 тег',
            z.object({
                title: z.string().min(1, "Назва модуля є обов'язковою"),
                order: z.number(),
            }),
        )
        .optional(),
});
