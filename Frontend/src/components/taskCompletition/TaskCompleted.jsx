import React from 'react';
import { LuArrowRight, LuBookOpen, LuCircleCheck, LuRepeat, LuStar, LuZap } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router';

export const TaskCompleted = ({ task, attempts }) => {
    console.log(task, '123');

    const navigate = useNavigate();
    const getDiffucultyColor = () => {
        return task.difficulty === 'easy'
            ? 'text-emerald-700  fill-emerald-700 '
            : task.difficulty === 'medium'
              ? 'text-amber-700 fill-amber-700 '
              : 'text-red-700 fill-red-700';
    };

    const getBackground = () => {
        return task.difficulty === 'easy'
            ? 'bg-emerald-50  border-emerald-200'
            : task.difficulty === 'medium'
              ? 'bg-amber-100 border-amber-200 hover:border-amber-300'
              : 'bg-red-100 border-red-200 hover:border-red-300';
    };
    return (
        <div className={`fixed inset-0 bg-slate-10 backdrop-blur-sm items-center justify-center z-50 flex`}>
            <div
                className=' bg-(--background-surface) p-4 flex flex-col rounded-3xl shadow-2xl max-w-lg w-full text-center'
                role='dialog'
                aria-modal='true'>
                <header className='flex flex-col justify-center items-center'>
                    <div className='inline-flex w-min items-center justify-center p-4 rounded-full bg-linear-to-br from-green-600 to-emerald-500 shadow-xl shadow-emerald-200 mb-5'>
                        <LuCircleCheck className='h-16 w-16 text-white' />
                    </div>
                    <p className='text-cta font-semibold text-xs text-blue-400'>ВІТАЄМО!</p>
                    <div className='grid max-w-sm gap-2'>
                        <h1 className='font-bold text-2xl'>Завдання виконано!</h1>
                        <p className='text-slate-500 text-sm leading-relaxed'>
                            Ви успішно виконали завдання <span className='font-semibold text-primary'>{task.topic}</span> з мови
                            програмування <span className='font-semibold text-primary'>{task.language}.</span>
                        </p>
                    </div>
                </header>
                <div className='px-8 py-5 '>
                    <div className='grid grid-cols-3 gap-3'>
                        <div className='rounded-2xl bg-blue-100 p-4 flex flex-col justify-center items-center gap-1'>
                            <LuRepeat className='text-blue-600 font-bold h-6 w-6' />
                            <p className='font-bold text-lg'>{attempts}</p>
                            <p className='text-sm text-secondary'>Спроб</p>
                        </div>
                        <div className='rounded-2xl bg-violet-100 p-4 flex flex-col justify-center items-center gap-1'>
                            <LuZap className='text-violet-600 font-bold h-6 w-6' />
                            <p className='font-bold text-lg'>+{task.points}</p>
                            <p className='text-sm text-secondary'>Очок</p>
                        </div>
                        <div className={`rounded-2xl ${getBackground()} p-4 flex flex-col justify-center items-center gap-1`}>
                            <LuStar className={`font-bold h-6 w-6 ${getDiffucultyColor()}`} />
                            <p className='font-bold text-lg'>
                                {task.difficulty === 'easy' ? 'Легко' : task.difficulty === 'medium' ? 'Середньо' : 'Важко'}
                            </p>
                            <p className='text-sm text-secondary'>Складність</p>
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
                        onClick={() => navigate('/practicum')}
                        className='flex flex-1 rounded-xl bg-cta'>
                        Ще завдання <LuArrowRight />
                    </Button>
                </footer>
            </div>
        </div>
    );
};
