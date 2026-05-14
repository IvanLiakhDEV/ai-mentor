import React from 'react';
import { useCourses } from '@/hooks/useCourse';
import { FaPlus } from 'react-icons/fa6';

import { Button } from '@/components/ui/Button';
import { CourseItem } from '@/components/accordioncourse/courseitem/CourseItem';
export const AdminPage = () => {
    const { data: courses, isLoading } = useCourses();

    if (isLoading) return <p>Loading</p>;

    return (
        <div className=' flex flex-col'>
            <header className='bg-white'>
                <h1 className='font-bold text-2xl p-6 text-gray-900 border-b'>Сторінка для адміністрування курсів</h1>
            </header>
            <main className='flex-1 p-6 space-y-2'>
                <div className='flex justify-between items-center'>
                    <h2>
                        Всього курсів:
                        <span className='font-bold'> {courses?.data?.length}</span>
                    </h2>
                    <Button
                        size='lg'
                        className='text-md bg-cta hover:bg-blue-900'>
                        <FaPlus />
                        <p>Додати курс</p>
                    </Button>
                </div>
                <div className='space-y-3'>
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
                        {courses.data.map(course => (
                            <CourseItem
                                course={course}
                                key={course._id}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
