import React from 'react';
import { Button } from '../button/Button';
import { Tag } from '../tag/Tag';
import { useNavigate } from 'react-router';
export const CourseCard = ({ courseData }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-5 p-6 transition-colors border shadow-sm cursor-pointer bg-bg-surface rounded-xl hover:border-blue-700 '>
            <div className='grid gap-4'>
                <h1 className='text-xl font-semibold'>{courseData.title}</h1>
                <h2 className='text-secondary'>{courseData.description}</h2>
            </div>
            <div>
                <ul className='flex gap-2'>
                    {courseData.tags.map((tag, index) => (
                        <Tag
                            title={tag}
                            key={index}
                        />
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
