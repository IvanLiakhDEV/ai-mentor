import React from 'react';
import { Header } from '../header/Header';
import { Outlet } from 'react-router';

export const Layout = () => {
    return (
        <div className='min-h-screen'>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
