import { api } from './axios';

export const fetchUserEnrollments = async () => {
    const response = await api.get('/enrollments/my');
    return response.data;
};
export const registerToCourse = async data => {
    const response = await api.post('/enrollments', { courseId: data });
    return response.data;
};
export const updateProgress = async id => {
    const response = await api.patch(`/enrollments/${id}/progress`);
    return response.data;
};
