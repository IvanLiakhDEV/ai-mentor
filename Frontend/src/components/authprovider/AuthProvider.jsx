import React from 'react';
import { useMe } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectIsInitialized } from '@/store/selectors/authSelectors';
import { useUserEnrollments } from '@/hooks/useEnrollment';
export const AuthProvider = ({ children }) => {
    useMe();
    useUserEnrollments();
    const isInitialized = useSelector(selectIsInitialized);
    if (!isInitialized) return <p>Test</p>;

    return <>{children}</>;
};
