import React from 'react';

export const Button = ({ title, fullWidth = false }) => {
    return (
        <button
            className={`flex flex-1  text-white bg-cta  ${fullWidth ? 'w-full' : 'px-6'} text-center justify-center items-center py-2 rounded-md`}>
            {title}
        </button>
    );
};
