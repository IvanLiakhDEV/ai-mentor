import React from 'react';

export const Box = ({ children, className }) => {
    return <div className={`bg-white border-gray-200 border rounded-lg p-6 shadow-sm ${className}`}>{children}</div>;
};
