import React, { useState } from 'react';
import { useCourses } from '@/hooks/useCourse';
import { FaPlus } from 'react-icons/fa6';
import { CourseItem } from '@/components/accordioncourse/courseitem/CourseItem';
import { Button } from '@/components/ui/Button';
import { CreateCourse } from '@/components/course/CreateCourse';
export const AdminPage = () => {
    const { data: courses, isLoading } = useCourses();
    const [isVisible, setIsVisible] = useState(false);

    if (isLoading) return <p>Loading</p>;
    return (
        <div className='flex flex-col'>
            <header className='bg-white'>
                <h1 className='font-bold text-2xl p-6 text-gray-900 border-b'>Сторінка для адміністрування курсів</h1>
            </header>
            <main className='flex-1 p-6 space-y-2'>
                <div className='flex justify-between items-center'>
                    <h2>
                        Всього курсів:
                        <span className='font-bold'> {courses?.courses?.length || 0}</span>
                    </h2>
                    <Button
                        size='lg'
                        className='text-md bg-cta hover:bg-blue-900'
                        onClick={() => setIsVisible(!isVisible)}>
                        <FaPlus />
                        <p>Додати курс</p>
                    </Button>
                    <CreateCourse
                        onClose={() => setIsVisible(false)}
                        isVisible={isVisible}
                    />
                </div>
                {courses?.courses && (
                    <div className='rounded-lg shadow-sm border-gray-200 grid gap-2'>
                        {courses?.courses.map(course => (
                            <CourseItem
                                course={course}
                                key={course._id}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
