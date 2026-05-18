import React from 'react';
import { Button } from '../button/Button';
import { Tag } from '../tag/Tag';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectEnrollments } from '@/store/selectors/enrollmentSelectors';
export const CourseCard = ({ courseData }) => {
    const usersCourses = useSelector(selectEnrollments);
    const isEnrolled = usersCourses?.find(value => value.courseId._id === courseData._id);
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-5 p-6 transition-colors border shadow-sm cursor-pointer bg-bg-surface rounded-xl  hover:border-blue-700 '>
            <div className='flex flex-col gap-4 flex-1'>
                <h1 className='text-xl font-semibold'>{courseData.title}</h1>
                <h2 className='text-secondary break-all line-clamp-3'>{courseData.description}</h2>
            </div>
            <div>
                <ul className='flex gap-2'>
                    {courseData?.tags?.slice(0, 6).map((tag, index) => (
                        <Tag
                            title={tag}
                            key={index}
                        />
                    ))}
                </ul>
            </div>
            <Button
                title={isEnrolled ? 'Продовжити навчання' : 'Розпочати курс'}
                onClick={() => navigate(`/course/${courseData._id}`)}
            />
        </div>
    );
};
