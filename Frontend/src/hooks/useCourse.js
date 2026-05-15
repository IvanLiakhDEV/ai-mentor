import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCourses } from '@/store/slices/courseSlice';
import { useEffect } from 'react';
import { createCourse, fetchCourseById, fetchCourses } from '@/api/course.api';
export const useCourses = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ['course'],
        queryFn: fetchCourses,
        retry: false,
    });
    useEffect(() => {
        if (query.data) dispatch(setCourses(query.data.data));
    }, [query.data]);
    return query;
};
export const useCourseById = (id, isEnabled) => {
    const query = useQuery({
        queryKey: ['course', id],
        queryFn: () => fetchCourseById(id),
        enabled: !!id && isEnabled,
        retry: false,
    });
    return query;
};
export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: data => createCourse(data),
        onSuccess: response => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
