import React from 'react';
import { Header } from '../header/Header';
import { Outlet } from 'react-router';

export const Layout = () => {
    return (
        <div className='flex flex-col h-auto '>
            <Header />
            <main className='flex-1'>
                <Outlet />
            </main>
        </div>
    );
};
