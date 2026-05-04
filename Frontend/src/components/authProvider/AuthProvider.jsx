import React from 'react';
import { useMe } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectIsInitialized } from '@/store/selectors/authSelectors';
export const AuthProvider = ({ children }) => {
    useMe();
    const isInitialized = useSelector(selectIsInitialized);
    if (!isInitialized) return <p>Test</p>;

    return <>{children}</>;
};
