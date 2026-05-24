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
export const editProfile = async data => {
    const response = await api.patch('/user/profile', data);
    return response.data;
};
export const fetchLeaderboard = async () => {
    const response = await api.get('/user/leaderboard');
    return response.data;
};
export const fetchProfile = async ({ id }) => {
    const response = await api.get(`/user/${id}`);
    return response.data.data;
};
