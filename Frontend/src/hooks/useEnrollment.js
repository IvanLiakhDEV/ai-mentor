import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserEnrollments, registerToCourse } from '@/api/enrollment.api';
import { setEnrollments } from '@/store/slices/enrollmentSlice';
export const useUserEnrollments = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ['enrollment'],
        queryFn: fetchUserEnrollments,
        retry: false,
    });
    useEffect(() => {
        if (query.data) dispatch(setEnrollments(query.data.data));
    }, [query.data]);
    return query;
};
// export const useCourseById = id => {
//     const query = useQuery({
//         queryKey: ['course', id],
//         queryFn: () => fetchCourseById(id),
//         enabled: !!id,
//         retry: false,
//     });
//     return query;
// };

export const useRegisterToCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: courseId => registerToCourse(courseId),
        onSuccess: (response, courseId) => {
            queryClient.invalidateQueries({ queryKey: ['enrollment'] });
            queryClient.invalidateQueries({ queryKey: ['course', courseId] });
            console.log('Успішно зареєстровано на курс:', courseId);
        },
        onError: error => {
            console.error('Помилка реєстрації:', error);
        },
    });
};
