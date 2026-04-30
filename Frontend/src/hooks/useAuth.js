import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '@/api/auth.api';

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: response => {
            ///TODO store data
            console.log(response);
        },
    });
};
export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: response => {
            ///TODO store data
            console.log(response);
        },
    });
};
