import { api } from './axios';

export const fetchLesson = async id => {
    const response = await api.get(`/lesson/${id}`);
    return response.data;
};
export const submitCode = async (code, id) => {
    const response = await api.post(`/lesson/submit`, { code, id });
    return response.data;
};
