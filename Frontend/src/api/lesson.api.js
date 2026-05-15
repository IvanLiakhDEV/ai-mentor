import { api } from './axios';

export const addLesson = async data => {
    const response = await api.post(`/lesson/`, data);
    return response.data;
};
export const fetchLesson = async id => {
    const response = await api.get(`/lesson/${id}`);
    return response.data;
};
export const submitCode = async (code, id) => {
    const response = await api.post(`/lesson/submit`, { code, id });
    return response.data;
};

export const reorderLessons = async lessons => {
    console.log('reorder payload:', lessons);
    const response = await api.patch('/lesson/reorder', { lessons });
    return response.data;
};
