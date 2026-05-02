import { createBrowserRouter } from 'react-router';
import { HomePage } from '../pages/home/HomePage';
import { AuthPage } from '../pages/auth/AuthPage';
import { ProtectedRoute } from './protectedRoute';
import { PublicRoute } from './publicRoute';
export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [{ path: '/auth', element: <AuthPage /> }],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
        ],
    },
]);
