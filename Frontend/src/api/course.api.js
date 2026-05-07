import { api } from './axios';

export const fetchCourses = async () => {
    const response = await api.get('/course');
    return response.data;
};
