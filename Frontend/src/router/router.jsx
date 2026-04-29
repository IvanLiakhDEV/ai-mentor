import { createBrowserRouter } from 'react-router';
import { HomePage } from '../pages/home/HomePage';
import { AuthPage } from '../pages/auth/AuthPage';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/auth',
        element: <AuthPage />,
    },
]);
