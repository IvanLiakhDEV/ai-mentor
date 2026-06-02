import { cn } from '@/lib/utils';
import React from 'react';
import { LuStar } from 'react-icons/lu';

export const Difficulty = ({ onDifficultyChange, isActive, difficultyValue, difficultyTitle }) => {
    const easyDifficultyClass =
        isActive && difficultyValue === 'easy'
            ? 'bg-emerald-50  border-emerald-200 hover:border-green-300'
            : 'border-slate-200 hover:border-slate-300';
    const mediumDifficultyClass =
        isActive && difficultyValue === 'medium'
            ? 'bg-amber-100 border-amber-200 hover:border-amber-300'
            : 'border-slate-200 hover:border-slate-300';
    const hardDifficultyClass =
        isActive && difficultyValue === 'hard'
            ? 'bg-red-100 border-red-200 hover:border-red-300'
            : 'border-slate-200 hover:border-slate-300';

    const starClassEasy = isActive && difficultyValue === 'easy' && 'text-emerald-500 fill-emerald-500';
    const starClassMedium = isActive && difficultyValue === 'medium' && 'text-amber-500 fill-amber-500';
    const starClassHard = isActive && difficultyValue === 'hard' && 'text-red-500 fill-red-500';
    return (
        <button
            type='button'
            className={`flex flex-col items-center gap-1 rounded-lg border transition-colors p-4 text-sm border-border ${easyDifficultyClass} ${mediumDifficultyClass} ${hardDifficultyClass}`}
            onClick={() => onDifficultyChange(difficultyValue)}>
            <div className='flex text-slate-400'>
                <LuStar className={cn(`h-4 w-4 ${starClassEasy} ${starClassMedium} ${starClassHard}`)} />
                <LuStar className={cn(`h-4 w-4 ${starClassMedium} ${starClassHard}`)} />
                <LuStar className={cn(`h-4 w-4 ${starClassHard}`)} />
            </div>
            <span className={cn(`font-semibold text-gray-500 ${starClassEasy} ${starClassMedium} ${starClassHard}`)}>
                {difficultyTitle}
            </span>
        </button>
    );
};
