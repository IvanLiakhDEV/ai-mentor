import { createTask, fetchMyTasks, fetchTask, submitTaskCode } from '@/api/practice';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchMyTasks = filters => {
    return useQuery({
        queryKey: ['my-tasks', filters],
        queryFn: () => fetchMyTasks(filters),
        retry: false,
        placeholderData: keepPreviousData,
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
