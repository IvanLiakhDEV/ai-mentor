import React from 'react';
import { cn } from '@/lib/utils';
export const Box = ({ children, className }) => {
    return <div className={cn('bg-bg-surface border-border border rounded-lg p-6 shadow-sm', className)}>{children}</div>;
};
