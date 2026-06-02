import { api } from './axios';

export const fetchMyTasks = async () => {
    const response = await api.get(`/practice/my-tasks`);
    return response.data;
};
export const fetchTask = async id => {
    const response = await api.get(`/practice/${id}`);
    return response.data;
};
export const createTask = async ({ topic, difficulty, language }) => {
    const response = await api.post(`/practice`, { topic, difficulty, language });
    return response.data;
};
export const submitTaskCode = async ({ id, code }) => {
    const response = await api.post(`/practice/submit/${id}`, { code });
    return response.data;
};
