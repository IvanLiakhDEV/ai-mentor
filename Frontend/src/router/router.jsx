import { createBrowserRouter } from 'react-router';
import { HomePage } from '../pages/home/HomePage';
import { AuthPage } from '../pages/auth/AuthPage';
import { ProtectedRoute } from './protectedRoute';
import { PublicRoute } from './publicRoute';
import { Layout } from '@/components/layout/Layout';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { CoursePage } from '@/pages/course/CoursePage';
import { LessonPage } from '@/pages/lesson/LessonPage';
import { LeaderBoardPage } from '@/pages/leaderboard/LeaderBoard';
import { ErrorBoundary } from '@/components/errorelement/ErrorBoundary';
import { AdminRoute } from './adminRoute';
import { AdminPage } from '@/pages/admin/AdminPage';
import { PublicProfilePage } from '@/pages/publicprofile/PublicProfilePage';
export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorBoundary />,
        children: [
            {
                element: <PublicRoute />,
                children: [{ path: 'auth', element: <AuthPage /> }],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Layout />,
                        children: [
                            { index: true, element: <HomePage /> },
                            { path: 'profile', element: <ProfilePage /> },
                            { path: 'profile/:id', element: <PublicProfilePage /> },
                            { path: 'course/:id', element: <CoursePage /> },
                            { path: 'leaderboard', element: <LeaderBoardPage /> },
                        ],
                    },
                    { path: 'lesson/:id', element: <LessonPage /> },
                    {
                        element: <AdminRoute />,
                        children: [{ path: 'admin', element: <AdminPage /> }],
                    },
                ],
            },
        ],
    },
]);
