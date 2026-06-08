import axios from 'axios';
import Enrollment from '../models/enrollment.js';
import { getLessonById } from './lesson.service.js';
import { getCourse } from './course.service.js';
import { getFileNameByLanguage } from '../utils/getFilename.js';
import UserStat from '../models/userStat.js';
import Achievement from '../models/achievement.js';
import UserAchievement from '../models/userAchievement.js';
import crypto from 'crypto';
import { calculateNewStreak } from '../utils/streakCalculator.js';
import { checkAndUnlockAchievements } from './achievement.service.js';

export const runCode = async ({ code, testCode, language, timeout = 4000 }) => {
    const secretToken = crypto.randomUUID();
    const response = await axios.post(
        'https://api.onecompiler.com/v1/run',
        {
            language,
            files: [
                {
                    name: getFileNameByLanguage(language),
                    content: `${code}\n\n${testCode.replace('___TESTS_PASSED___', secretToken)}`,
                },
            ],
        },
        {
            headers: {
                'X-API-Key': process.env.ONECOMPILER_KEY,
                'Content-Type': 'application/json',
            },
            timeout,
        },
    );
    const { stdout, stderr, exception, status } = response.data;
    const isCorrect = stdout ? stdout.includes(secretToken) : false;
    const cleanStdout = stdout?.replace(secretToken, '').trim() || '';
    return { stdout: cleanStdout, stderr, exception, status, isCorrect };
};
