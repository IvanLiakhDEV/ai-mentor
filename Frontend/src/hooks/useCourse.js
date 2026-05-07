import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCourses } from '@/store/slices/courseSlice';
import { useEffect } from 'react';
import { fetchCourses } from '@/api/course.api';
export const useCourses = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
        retry: false,
    });
    useEffect(() => {
        if (query.data) dispatch(setCourses(query.data.data));
    }, [query.data]);
    return query;
};
