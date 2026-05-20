import { api } from './axios';
export const fetchMyAchievements = async () => {
    const response = await api.get('/achievement/my');
    return response.data;
};
export const fetchAchievements = async () => {
    const response = await api.get('/achievement');
    return response.data;
};
