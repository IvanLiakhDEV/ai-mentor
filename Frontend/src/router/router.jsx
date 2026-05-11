import { createBrowserRouter } from 'react-router';
import { HomePage } from '../pages/home/HomePage';
import { AuthPage } from '../pages/auth/AuthPage';
import { ProtectedRoute } from './protectedRoute';
import { PublicRoute } from './publicRoute';
import { Layout } from '@/components/layout/Layout';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { CoursePage } from '@/pages/course/CoursePage';
import { LessonPage } from '@/pages/lesson/LessonPage';
import { LeaderBoardPage } from '@/pages/leaderBoard/LeaderBoard';
export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [{ path: '/auth', element: <AuthPage /> }],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    { path: '/', element: <HomePage /> },
                    { path: '/profile', element: <ProfilePage /> },
                    { path: '/course/:id', element: <CoursePage /> },
                    { path: '/leaderboard', element: <LeaderBoardPage /> },
                ],
            },
            { path: '/lesson/:id', element: <LessonPage /> },
        ],
    },
]);
