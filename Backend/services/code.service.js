import axios from 'axios';
import Enrollment from '../models/enrollment.js';
import Lesson from '../models/lesson.js';
import { getLessonById } from './lesson.service.js';
import User from '../models/user.js';
export const executeCode = async (code, lessonId, userId) => {
    const lesson = await getLessonById(lessonId, userId);
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
    const enrollment = await Enrollment.findOne({ courseId: lesson.courseId, userId });
    const alreadyCompleted = enrollment.completedSequence >= lesson.sequenceNumber;

    if (isCorrect && !alreadyCompleted) {
        await Promise.all([
            Enrollment.findOneAndUpdate(
                { courseId: lesson.courseId, userId },
                { $max: { completedSequence: lesson.sequenceNumber }, $inc: { points: lesson.points } },
            ),
            User.findByIdAndUpdate(userId, {
                $inc: { points: lesson.points },
            }),
        ]);
    }

    return {
        stdout,
        stderr,
        exception,
        status,
        isCorrect,
    };
};
