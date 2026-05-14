import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { selectIsAuthenticated, selectIsInitialized, selectUser } from '@/store/selectors/authSelectors';
export const AdminRoute = () => {
    const user = useSelector(selectUser);
    const isAdmin = user?.role === 'admin';
    if (!isAdmin)
        return (
            <Navigate
                to='/'
                replace
            />
        );

    return <Outlet />;
};
