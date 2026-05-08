import React from 'react';

export const Button = ({
    title,
    fullWidth = false,
    onClick,
    isDisabled = false,
    type = 'button',
    prefixIcon: PreffixIcon,
    suffixIcon: SuffixIcon,
    className,
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            onClick={onClick}
            className={`flex text-white bg-cta  ${fullWidth ? 'w-full' : 'px-6'} text-center justify-center items-center py-2 rounded-md hover:bg-blue-900 transition-colors duration-200 ${className}`}>
            {PreffixIcon && <PreffixIcon className='w-5 h-5 mr-2' />}
            {title}
            {SuffixIcon && <SuffixIcon className='w-5 h-5 ml-2' />}
        </button>
    );
};
