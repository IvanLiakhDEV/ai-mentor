import React from 'react';
import { Box } from '../box/Box';
import { LuBot, LuUser } from 'react-icons/lu';

export const Message = ({ message, isBot = true, isError = false }) => {
    return (
        <div className={`flex gap-3 items-start ${!isBot && 'flex-row-reverse'}`}>
            <div className='rounded-full bg-bg-cta shadow-lg p-2 flex '>
                {isBot ? <LuBot className='h-7 w-7 ' /> : <LuUser className='h-7 w-7 ' />}
            </div>
            <Box className='p-3 flex-1'>
                <p className={`text-sm ${isError && 'text-red-400'}`}>{message}</p>
            </Box>
        </div>
    );
};
