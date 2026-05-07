import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMe, loginUser, registerUser } from '@/api/auth.api';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { useEffect } from 'react';
export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: response => {
            console.log(response);
        },
    });
};
export const useLogin = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: response => {
            dispatch(setUser(response.data));
        },
    });
};
export const useMe = () => {
    const dispatch = useDispatch();

    const query = useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        retry: false,
    });
    useEffect(() => {
        if (query.data) dispatch(setUser(query.data.data));
    }, [query.data]);

    return query;
};
