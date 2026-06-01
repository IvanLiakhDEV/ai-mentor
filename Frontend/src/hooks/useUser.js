import { useMutation, useQuery } from '@tanstack/react-query';
import { editProfile, fetchLeaderboard, fetchMe, fetchProfile, loginUser, logOut, registerUser } from '@/api/auth.api';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '@/store/slices/authSlice';
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
export const useGetProfile = id => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => fetchProfile({ id }),
        retry: false,
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
export const useEditProfile = () => {
    const dispatch = useDispatch();
    return useMutation({
        queryKey: ['editprofile'],
        mutationFn: data => editProfile(data),
        onSuccess: data => {
            dispatch(setUser(data.data));
        },
    });
};
export const useLogOut = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            dispatch(clearUser());
        },
    });
};

export const useLeaderboard = () => {
    const query = useQuery({
        queryKey: ['leaderboard'],
        queryFn: fetchLeaderboard,
        retry: false,
    });
    return query;
};
