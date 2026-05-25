import React, { useEffect, useState } from 'react';
import { LuBookOpen, LuTrophy, LuZap } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import { Button } from '../ui/Button';
import confetti from 'canvas-confetti';

export const CourseCompletitionDialog = ({ course, points, numberOfLessons }) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [lessonCount, setLessonCount] = useState(0);

    useEffect(() => {
        if (numberOfLessons === 0) return;
        let startTimestamp = null;
        const step = timestamp => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
            setLessonCount(Math.floor(progress * numberOfLessons));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [numberOfLessons]);
    useEffect(() => {
        if (numberOfLessons > 0 && lessonCount === numberOfLessons) {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6, x: 0.4 },
                zIndex: 9999,
            });
        }
    }, [lessonCount, numberOfLessons]);
    useEffect(() => {
        if (points === 0) return;
        if (numberOfLessons != lessonCount) return;
        let startTimestamp = null;
        const step = timestamp => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
            setCount(Math.floor(progress * points));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [points, numberOfLessons, lessonCount]);
    useEffect(() => {
        if (points > 0 && count === points) {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6, x: 0.6 },
                zIndex: 9999,
            });
        }
    }, [count, points]);
    return (
        <div className={`fixed inset-0 bg-slate-10 backdrop-blur-sm items-center justify-center z-50 flex`}>
            <div
                className=' bg-(--background-surface) p-4 flex flex-col rounded-3xl shadow-2xl max-w-lg w-full text-center'
                role='dialog'
                aria-modal='true'>
                <header className='flex flex-col justify-center items-center'>
                    <div className='inline-flex w-min items-center justify-center p-4 rounded-full bg-linear-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-200 mb-5'>
                        <LuTrophy className='h-16 w-16 text-white' />
                    </div>
                    <p className='text-cta font-semibold text-xs'>ВІТАЄМО!</p>
                    <div className='grid max-w-sm gap-2'>
                        <h1 className='font-bold text-2xl'>Курс завершено</h1>
                        <p className='text-slate-500 text-sm leading-relaxed'>
                            Ви успішно пройшли курс <span className='font-semibold text-primary'>{course.title}.</span> Ваша наполегливість
                            дала результат!
                        </p>
                    </div>
                </header>
                <div className='px-8 py-5 '>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='rounded-2xl bg-blue-100 p-4 flex flex-col justify-center items-center'>
                            <LuBookOpen className='text-blue-600 font-bold h-6 w-6' />
                            <p className='font-bold text-lg'>{lessonCount}</p>
                            <p className='text-sm text-secondary'>Уроків пройдено</p>
                        </div>
                        <div className='rounded-2xl bg-violet-100 p-4 flex flex-col justify-center items-center'>
                            <LuZap className='text-violet-600 font-bold h-6 w-6' />
                            <p className='font-bold text-lg'>{count}</p>
                            <p className='text-sm text-secondary'>Зароблених очок</p>
                        </div>
                    </div>
                </div>
                <footer className='flex  items-center px-8 gap-6'>
                    <Button
                        className='flex flex-1 rounded-xl'
                        variant='secondary'
                        onClick={() => navigate('/')}>
                        На головну сторінку
                    </Button>
                    <Button
                        onClick={() => navigate('/profile')}
                        className='flex flex-1 rounded-xl bg-cta'
                        variant=''>
                        Профіль
                    </Button>
                </footer>
            </div>
        </div>
    );
};
