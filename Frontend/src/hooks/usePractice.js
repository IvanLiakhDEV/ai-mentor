import { createTask, fetchMyTasks } from '@/api/practice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchMyTasks = () => {
    return useQuery({
        queryKey: ['my-tasks'],
        queryFn: fetchMyTasks,
        retry: false,
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
