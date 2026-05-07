import axios from 'axios';
import { clearUser } from '@/store/slices/authSlice';
import store from '@/store/store';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await api.post('/user/refresh');
                return api(originalRequest);
            } catch {
                store.dispatch(clearUser());
            }
        }
        return Promise.reject(error);
    },
);
