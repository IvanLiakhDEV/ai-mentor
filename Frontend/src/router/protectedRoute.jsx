import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { selectIsAuthenticated, selectIsInitialized } from '@/store/selectors/authSelectors';
import { Toaster } from '@/components/ui/sonner';
export const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isInitialized = useSelector(selectIsInitialized);
    if (!isInitialized) return null;
    if (!isAuthenticated)
        return (
            <Navigate
                to='/auth'
                replace
            />
        );

    return (
        <div>
            <Outlet /> <Toaster position='top-center' />
        </div>
    );
};
