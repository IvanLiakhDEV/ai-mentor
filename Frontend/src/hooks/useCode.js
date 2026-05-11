import { submitCode } from '@/api/lesson.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSubmitCode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ code, id }) => submitCode(code, id),
        onSuccess: data => {
            if (data.data.isCorrect) {
                queryClient.invalidateQueries({ queryKey: ['enrollment'] });
            }
        },
    });
};
