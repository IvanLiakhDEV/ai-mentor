import { fetchLesson } from '@/api/lesson.api';
import { useQuery } from '@tanstack/react-query';

export const useGetLesson = id => {
    return useQuery({
        queryKey: ['lesson', id],
        queryFn: () => fetchLesson(id),
        enabled: !!id,
        retry: false,
    });
};
