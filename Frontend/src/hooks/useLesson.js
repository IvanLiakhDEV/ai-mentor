import { addLesson, deleteLesson, editLessons, fetchLesson, getNextLesson, reorderLessons } from '@/api/lesson.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useGetLesson = id => {
    const navigate = useNavigate();

    return useQuery({
        queryKey: ['lesson', id],
        queryFn: () => fetchLesson(id),
        enabled: !!id,
        retry: false,
        onError: error => {
            if (error.response?.status === 403) {
                navigate('/');
            }
        },
    });
};
export const useGetNextLesson = () => {
    return useMutation({
        mutationKey: ['nextLesson'],
        mutationFn: ({ courseId }) => getNextLesson({ courseId }),
    });
};
export const useAddLesson = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: data => addLesson(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useReorderLessons = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: data => reorderLessons(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useEditLesson = courseId => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: ({ id, lesson }) => editLessons(id, lesson),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
    });
    return query;
};
export const useDeleteLesson = courseId => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: ({ id }) => deleteLesson(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
    });
    return query;
};
