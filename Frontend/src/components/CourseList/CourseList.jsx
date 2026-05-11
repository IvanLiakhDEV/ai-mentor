import React, { useState } from 'react';
import { useCourses } from '@/hooks/useCourse';
import { selectCourses, selectIsInitialized } from '@/store/selectors/courseSelectors';
import { useSelector } from 'react-redux';
import { CourseCard } from '../coursecard/CourseCard';
import { InputField } from '../inputs/InputField';
import { HiMagnifyingGlass } from 'react-icons/hi2';
export const CourseList = () => {
    useCourses();
    const isInitialized = useSelector(selectIsInitialized);
    const courses = useSelector(selectCourses);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = courses.filter(course => {
        const query = searchQuery.toLowerCase();
        return course.title.toLowerCase().includes(query) || course.tags.some(tag => tag.toLowerCase().includes(query));
    });

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-2xl font-bold '>Досліджуй каталог доступних курсів</h1>
            <div className='-mt-3.75'>
                <InputField
                    placeholder={'Введіть назвою або тег'}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    icon={HiMagnifyingGlass}
                />
            </div>
            <div className='flex gap-10'>
                {isInitialized ? (
                    filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
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
