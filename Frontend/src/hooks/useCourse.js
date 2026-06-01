import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCourses } from '@/store/slices/courseSlice';
import { useEffect } from 'react';
import {
    addModule,
    createCourse,
    deleteCourse,
    deleteModule,
    editCourse,
    editModule,
    fetchCourseById,
    fetchCourses,
    toggleArchiveCourse,
} from '@/api/course.api';
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
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: ({ id }) => deleteCourse(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useEditCourse = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: ({ id, data }) => editCourse(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useToggleArchiveCourse = id => {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: () => toggleArchiveCourse(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useAddModule = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: ({ id, ...data }) => addModule(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useEditModule = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: ({ id, data }) => editModule(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
export const useDeleteModule = () => {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: ({ id }) => deleteModule(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course'] }),
    });
    return query;
};
