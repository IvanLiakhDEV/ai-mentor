import React from 'react';
import { useMe } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectIsInitialized } from '@/store/selectors/authSelectors';
import { useUserEnrollments } from '@/hooks/useEnrollment';
import { Spinner } from '../ui/Spinner';
export const AuthProvider = ({ children }) => {
    useMe();
    useUserEnrollments();
    const isInitialized = useSelector(selectIsInitialized);
    if (!isInitialized)
        return (
            <div className='flex h-screen w-full items-center justify-center'>
                <Spinner className='w-10 h-10 ' />
            </div>
        );

    return <>{children}</>;
};
