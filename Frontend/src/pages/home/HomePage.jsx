import { CourseList } from '@/components/courselist/CourseList';
import React from 'react';
export const HomePage = () => {
    return (
        <div className='flex flex-col mx-auto'>
            <section className='w-full bg-cta'>
                <div className='grid gap-10 px-6 py-16 mx-auto text-white max-w-7xl '>
                    <h1 className='text-5xl font-semibold '>Навчись програмувати зараз та безкоштовно</h1>
                    <h2 className='text-xl'>Вивчай нове та покращуй набуте</h2>
                </div>
            </section>
            <div className='flex w-full px-6 mx-auto mt-6 max-w-7xl '>
                <CourseList />
            </div>
        </div>
    );
};
