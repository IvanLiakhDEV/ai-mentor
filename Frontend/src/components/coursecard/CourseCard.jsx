import React from 'react';
import { Button } from '../button/Button';
import { Tag } from '../tag/Tag';
import { useNavigate } from 'react-router';
export const CourseCard = ({ courseData, key }) => {
    const navigate = useNavigate();
    return (
        <div
            className='grid gap-5 p-6 transition-colors border border-gray-200 shadow-sm cursor-pointer max-w-100 bg-bg-surface rounded-xl hover:border-blue-700'
            key={key}>
            <div className='grid gap-4'>
                <h1 className='text-lg font-semibold'>{courseData.title}</h1>
                <h2 className='text-secondary'>{courseData.description}</h2>
            </div>
            <div>
                <ul className='flex gap-2'>
                    {courseData.tags.map(tag => (
                        <Tag title={tag} />
                    ))}
                </ul>
            </div>
            <Button
                title={'Розпочати курс'}
                onClick={() => navigate(`/course/${courseData._id}`)}
            />
        </div>
    );
};
