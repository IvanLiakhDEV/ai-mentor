import React from 'react';
import { Header } from '../header/Header';
import { Outlet } from 'react-router';

export const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};
