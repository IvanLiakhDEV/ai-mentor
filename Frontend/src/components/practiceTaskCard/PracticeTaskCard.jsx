import React from 'react';
import { Box } from '../box/Box';
import { LuTrophy } from 'react-icons/lu';
import { cn } from '@/lib/utils';

export const PracticeTaskCard = ({ difficulty, title, description, points }) => {
    const taskDifficulty = difficulty === 'easy' ? 'Легко' : difficulty === 'medium' ? 'Середньо' : 'Важко';
    const getDiffucultyColor = () => {
        return difficulty === 'easy'
            ? 'text-emerald-700 border-emerald-300 bg-emerald-50 '
            : difficulty === 'medium'
              ? 'text-amber-700 border-amber-300 bg-amber-50'
              : 'text-red-700 border-red-300 bg-red-50';
    };
    return (
        <Box className='flex-col space-y-2'>
            <div className='flex gap-2'>
                <span className={cn(`rounded-2xl font-semibold text-xs  border px-2 ${getDiffucultyColor()}`)}>{taskDifficulty}</span>
            </div>
            <div className='grid gap-2'>
                <h1 className='text-lg font-semibold'>{title}</h1>
                <span className='text-sm text-slate-500 font-medium'>{description}</span>
            </div>
            <div>
                <div className='flex text-slate-400 items-center gap-1'>
                    <LuTrophy className='h-max w-max font-bold' />
                    <span className='text-sm'>+{points} очок</span>
                </div>
            </div>
        </Box>
    );
};
