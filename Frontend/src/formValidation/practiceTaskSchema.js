import { z } from 'zod';

const DIFICULTY = ['easy', 'medium', 'hard'];

export const taskValidationSchema = z.object({
    topic: z.string().trim().min(3, 'Тема не може бути коротшою за 3 символи').max(100, 'Тема не може бути довшою за 100 символів'),
    difficulty: z.enum(['easy', 'medium', 'hard'], 'Невірна складність. Допустимі значення: easy, medium, hard'),
    language: z
        .enum(
            ['typescript', 'javascript', 'python', 'java', 'dart', 'ruby', 'cpp', 'c', 'csharp', 'sql', 'php'],
            'Невірна мова. Допустимі значення: typescript, javascript, python, java, dart, ruby, cpp, c, csharp, sql, php',
        )
        .default('javascript'),
});
