import axios from 'axios';
import Enrollment from '../models/enrollment.js';
import Lesson from '../models/lesson.js';

export const executeCode = async (code, lessonId, userId) => {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw new ErrorHandler('Урок не знайдено', 404);

    const response = await axios.post(
        'https://api.onecompiler.com/v1/run',
        {
            language: 'javascript',
            files: [{ name: 'main.js', content: code }],
        },
        {
            headers: {
                'X-API-Key': process.env.ONECOMPILER_KEY,
                'Content-Type': 'application/json',
            },
        },
    );

    const { stdout, stderr, exception, status } = response.data;
    const normalize = str => str?.trim().replace(/[\s\n]/g, '');
    const isCorrect = normalize(stdout) === normalize(lesson.practice.expectedOutput);

    if (isCorrect) {
        await Enrollment.findOneAndUpdate({ courseId: lesson.courseId, userId }, { $max: { completedSequence: lesson.sequenceNumber } });
    }

    return {
        stdout,
        stderr,
        exception,
        status,
        isCorrect,
    };
};
