// @ts-check
import { z } from 'zod';

export const registerSchema = z
    .object({
        username: z.string().min(3, 'Нікнейм має бути від 3 символів').max(20, 'Нікнейм має бути до 20 символів'),
        email: z.email('Некоректний формат пошти').nonempty('Поле не може бути порожнім'),
        password: z
            .string()
            .min(8, 'Пароль має бути від 8 символів')
            .regex(/[A-Z]/, 'Потрібна хоча б одна велика літера')
            .regex(/[0-9]/, 'Потрібна хоча б одна цифра')
            .regex(/[^a-zA-Z0-9]/, 'Додай хоча б один спецсимвол'),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Паролі не співпадають',
    });
export const loginSchema = z.object({
    email: z.email('Некоректний формат пошти').nonempty('Поле не може бути порожнім'),
    password: z.string().nonempty('Поле не може бути порожнім'),
});
