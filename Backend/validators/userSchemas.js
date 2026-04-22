// @ts-check
import { z } from 'zod';
import { issuesHandler } from '../middleware/validation.js';

export const registerSchema = z.object({
    username: z.string(issuesHandler('username')).min(3, 'Нікнейм має бути від 8 символів').max(30, 'Нікнейм має бути до 30 символів'),
    email: z.email(issuesHandler('email')),
    password: z
        .string(issuesHandler('password'))
        .min(8, 'Пароль має бути від 8 символів')
        .regex(/[A-Z]/, 'Потрібна хоча б одна велика літера')
        .regex(/[0-9]/, 'Потрібна хоча б одна цифра')
        .regex(/[^a-zA-Z0-9]/, 'Додай хоча б один спецсимвол'),
});

export const loginSchema = z.object({
    email: z.email(issuesHandler('email')),
    password: z.string(issuesHandler('password')),
});
export const changePasswordSchema = z
    .object({
        currentPassword: z.string(issuesHandler('currentPassword')),
        newPassword: z
            .string(issuesHandler('newPassword'))
            .min(8, 'Пароль має бути від 8 символів')
            .regex(/[A-Z]/, 'Потрібна хоча б одна велика літера')
            .regex(/[0-9]/, 'Потрібна хоча б одна цифра')
            .regex(/[^a-zA-Z0-9]/, 'Додай хоча б один спецсимвол'),
    })
    .refine(data => data.currentPassword != data.newPassword, {
        message: 'Паролі не повинні збігатися',
    });
