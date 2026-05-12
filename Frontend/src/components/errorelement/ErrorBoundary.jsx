import React from 'react';
import { Box } from '../box/Box';
import { useRouteError } from 'react-router';
export const ErrorBoundary = () => {
    let error = useRouteError();
    return (
        <div className='p-2'>
            <Box className='m-6 flex flex-col text-wrap break-all'>
                <h1 className='text-2xl font-semibold'>Виникла помилка 😿</h1>
                <p className='text-lg text-red-500 font-semibold'>Помилка: {error.statusText || error.message}</p>
                <p className='text-sm'>Повний опис: {error.stack}</p>
            </Box>
        </div>
    );
};
