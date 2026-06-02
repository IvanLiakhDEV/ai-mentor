import { createTask, fetchMyTasks, fetchTask, submitTaskCode } from '@/api/practice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchMyTasks = () => {
    return useQuery({
        queryKey: ['my-tasks'],
        queryFn: fetchMyTasks,
        retry: false,
    });
};
export const useFetchTask = id => {
    return useQuery({
        queryKey: ['task', id],
        queryFn: () => fetchTask(id),
        retry: false,
        enabled: !!id,
    });
};
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: taskData => createTask(taskData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
        },
    });
};
export const useSubmitCode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: codeData => submitTaskCode(codeData),
        onSuccess: res => {
            if (res.isCorrect) {
                queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
            }
        },
    });
};
