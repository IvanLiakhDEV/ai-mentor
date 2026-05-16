import { api } from './axios';

export const addLesson = async data => {
    console.log(data);

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
    const response = await api.patch('/lesson/reorder', { lessons });
    return response.data;
};
export const editLessons = async (id, lesson) => {
    const response = await api.patch(`/lesson/${id}`, { lesson });
    return response.data;
};
export const deleteLesson = async id => {
    const response = await api.delete(`/lesson/${id}`);
    return response.data;
};
