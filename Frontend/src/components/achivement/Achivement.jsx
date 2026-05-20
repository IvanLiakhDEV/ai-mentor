import React from 'react';

export const Achivement = ({ achivement, isCompleted = false }) => {
    return (
        <div
            className={`border rounded-lg p-4 transition-all  bg-cta/5 flex justify-between mt-4 items-center ${!isCompleted ? 'opacity-60 border-(--border-color)' : 'border-cta'}`}>
            <div className='flex gap-4'>
                <img
                    src={achivement.iconUrl}
                    alt=''
                    width={40}
                />
                <div className='flex flex-col'>
                    <h2 className='font-bold text-xl'>{achivement.title}</h2>
                    <span className='text-sm text-secondary'>{achivement.description}</span>
                </div>
            </div>
            {isCompleted && (
                <div className='bg-green-200 rounded-full'>
                    <span className='text-green-700 text-sm p-2'>Здобуто</span>
                </div>
            )}
        </div>
    );
};
