import React from 'react';
import { useMe } from '@/hooks/useAuth';
export const AuthProvider = ({ children }) => {
    const { isLoading } = useMe();

    if (isLoading) return <p>Test</p>;

    return <>{children}</>;
};
