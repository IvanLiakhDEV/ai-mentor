import { api } from './axios';

export const loginUser = async data => {
    const response = await api.post('/user/login', data);
    return response.data;
};
export const registerUser = async data => {
    const response = await api.post('/user/register', data);
    return response.data;
};
export const fetchMe = async () => {
    const response = await api.get('/user/');
    return response.data;
};
