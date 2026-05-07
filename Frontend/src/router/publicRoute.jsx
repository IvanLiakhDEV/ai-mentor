import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { selectIsAuthenticated, selectIsInitialized } from '@/store/selectors/authSelectors';

export const PublicRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isInitialized = useSelector(selectIsInitialized);

    if (!isInitialized) return null;

    if (isAuthenticated)
        return (
            <Navigate
                to='/'
                replace
            />
        );

    return <Outlet />;
};
