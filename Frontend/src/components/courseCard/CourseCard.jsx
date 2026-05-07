import React from 'react';
import { Button } from '../button/Button';
import { Tag } from '../tag/Tag';
export const CourseCard = ({ courseData, key }) => {
    return (
        <div
            className='grid max-w-[22.5rem] p-6 bg-bg-surface border cursor-pointer border-gray-200 rounded-xl shadow-sm gap-5 hover:border-blue-700 transition-colors'
            key={key}>
            <div className='grid gap-4'>
                <h1 className='text-lg font-semibold'>{courseData.title}</h1>
                <h2 className='text-secondary '>{courseData.description}</h2>
            </div>
            <div>
                <ul className='flex gap-2'>
                    {courseData.tags.map(tag => (
                        <Tag title={tag} />
                    ))}
                </ul>
            </div>
            <Button title={'Розпочати курс'} />
        </div>
    );
};
