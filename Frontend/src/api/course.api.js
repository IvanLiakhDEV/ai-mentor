import { api } from './axios';

export const fetchCourses = async () => {
    const response = await api.get('/course');
    return response.data;
};
export const fetchCourseById = async id => {
    const response = await api.get(`/course/${id}`);
    return response.data;
};
export const createCourse = async data => {
    const response = await api.post(`/course`, data);
    return response.data;
};
