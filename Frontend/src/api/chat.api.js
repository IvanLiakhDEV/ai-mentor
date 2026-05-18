import { api } from './axios';

export const sendMessage = async data => {
    const response = await api.post('/chat/ask', data);
    return response.data;
};
