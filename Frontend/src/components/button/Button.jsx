import React from 'react';

export const Button = ({ title, fullWidth = false, onClick, isDisabled = false, type = 'button' }) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            onClick={onClick}
            className={`flex   text-white bg-cta  ${fullWidth ? 'w-full' : 'px-6'} text-center justify-center items-center py-2 rounded-md`}>
            {title}
        </button>
    );
};
