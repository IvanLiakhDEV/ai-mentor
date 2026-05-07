import { useCourses } from '@/hooks/useCourse';
import { selectCourses, selectIsInitialized } from '@/store/selectors/courseSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { CourseCard } from '../courseCard/CourseCard';
export const CourseList = () => {
    useCourses();
    const isInitialized = useSelector(selectIsInitialized);
    const courses = useSelector(selectCourses);

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-2xl font-bold'>Досліджуй каталог доступних курсів</h1>
            <div className='flex gap-10'>
                {isInitialized ? (
                    courses.length > 0 ? (
                        courses.map((course, index) => (
                            <CourseCard
                                courseData={course}
                                key={index}
                            />
                        ))
                    ) : (
                        <p className='text-center'>Список курсів порожній</p>
                    )
                ) : (
                    <p className='text-center'>Завантаження курсів...</p>
                )}
            </div>
        </div>
    );
};
