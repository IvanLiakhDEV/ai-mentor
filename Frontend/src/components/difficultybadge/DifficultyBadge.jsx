import { cn } from '@/lib/utils';
import React from 'react';

export const DifficultyBadge = ({ difficulty }) => {
    const getDiffucultyColor = () => {
        return difficulty === 'Beginner'
            ? 'text-emerald-700 border-emerald-300 bg-emerald-50 '
            : difficulty === 'Intermediate'
              ? 'text-amber-700 border-amber-300 bg-amber-50'
              : 'text-red-700 border-red-300 bg-red-50';
    };
    return <div className={cn(`rounded-2xl font-semibold text-sm p-1 max-w-min  border px-2 ${getDiffucultyColor()}`)}>{difficulty}</div>;
};
