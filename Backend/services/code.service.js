import axios from 'axios';
import Enrollment from '../models/enrollment.js';
import Lesson from '../models/lesson.js';
import { getLessonById } from './lesson.service.js';
import User from '../models/user.js';
import Course from '../models/course.js';
import { getCourse } from './course.service.js';
import { getFileNameByLanguage } from '../utils/getFilename.js';
export const executeCode = async (code, lessonId, userId) => {
    const lesson = await getLessonById(lessonId, userId);
    const course = await getCourse(lesson.courseId, userId);
    const response = await axios.post(
        'https://api.onecompiler.com/v1/run',
        {
            language: course.language,
            files: [{ name: getFileNameByLanguage(course.language), content: code }],
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
    const isCorrect = normalize(stdout) === normalize(lesson.practice.expectedOutput || null);
    const enrollment = await Enrollment.findOne({ courseId: lesson.courseId, userId });

    const alreadyCompleted = enrollment.completedSequence >= lesson.sequenceNumber;
    const isLastLesson = course.numberOfLessons === lesson.sequenceNumber;
    if (isCorrect && !alreadyCompleted) {
        const enrollmentUpdate = {
            $max: { completedSequence: lesson.sequenceNumber },
            $inc: { points: lesson.points },
        };
        const userUpdate = {
            $inc: { points: lesson.points },
        };

        if (isLastLesson) {
            enrollmentUpdate.$set = { status: 'Completed' };
            userUpdate.$inc.completedCourses = 1;
        }

        await Promise.all([
            Enrollment.findOneAndUpdate({ courseId: lesson.courseId, userId }, enrollmentUpdate),
            User.findByIdAndUpdate(userId, userUpdate),
        ]);
    }

    const nextLesson = course.modules?.flatMap(module => module.lessons).find(l => l.sequenceNumber === lesson.sequenceNumber + 1) || null;
    console.log(nextLesson);

    return {
        stdout,
        stderr,
        exception,
        status,
        isCorrect,
        nextLesson,
    };
};
