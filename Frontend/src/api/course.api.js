import { api } from './axios';

export const fetchCourses = async filters => {
    const response = await api.get('/course', { params: filters });
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
export const deleteCourse = async id => {
    const response = await api.delete(`/course/${id}`);
    return response.data;
};
export const editCourse = async (id, data) => {
    const response = await api.patch(`/course/${id}`, data);
    return response.data;
};
export const toggleArchiveCourse = async id => {
    const response = await api.patch(`/course/${id}/toggle-archived`);
    return response.data;
};

export const addModule = async (id, data) => {
    const response = await api.post(`/course/${id}/modules`, data);
    return response.data;
};
export const editModule = async (id, data) => {
    const response = await api.patch(`/course/${id}/modules`, data);
    return response.data;
};
export const deleteModule = async id => {
    const response = await api.delete(`/course/${id}/modules`);
    return response.data;
};
