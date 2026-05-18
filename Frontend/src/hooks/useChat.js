import { sendMessage } from '@/api/chat.api';
import { useMutation } from '@tanstack/react-query';

export const useSendMessage = () => {
    return useMutation({
        mutationFn: data => sendMessage(data),
        onError: error => console.log(error),
    });
};
