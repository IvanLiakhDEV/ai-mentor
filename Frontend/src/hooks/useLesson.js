import { fetchLesson } from '@/api/lesson.api';
import { useQuery } from '@tanstack/react-query';
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
