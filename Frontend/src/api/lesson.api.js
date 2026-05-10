import { api } from './axios';

export const fetchLesson = async id => {
    const response = await api.get(`/lesson/${id}`);
    return response.data;
};
