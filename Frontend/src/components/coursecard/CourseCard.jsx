import React, { useMemo } from 'react';
import { Button } from '../button/Button';
import { Tag } from '../tag/Tag';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectEnrollments } from '@/store/selectors/enrollmentSelectors';
import { DifficultyBadge } from '../difficultybadge/DifficultyBadge';
export const CourseCard = ({ courseData }) => {
    const usersCourses = useSelector(selectEnrollments);
    const isEnrolled = usersCourses?.find(value => value.courseId._id === courseData._id);
    const navigate = useNavigate();

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

    const color = useMemo(() => {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }, []);

    return (
        <div className='flex flex-col transition-colors border shadow-sm cursor-pointer bg-bg-surface rounded-xl  hover:border-blue-700 overflow-hidden'>
            <div
                className='h-2'
                style={{ backgroundColor: color }}
            />
            <div className='flex flex-col gap-5 p-6 flex-1'>
                <div className='flex flex-col gap-4 flex-1'>
                    <DifficultyBadge difficulty={courseData.difficulty} />
                    <h1 className='text-xl font-semibold'>{courseData.title}</h1>
                    <h2 className='text-secondary break-all line-clamp-3'>{courseData.description}</h2>
                </div>
                <div>
                    <ul className='flex gap-2 line-clamp-1'>
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
        </div>
    );
};
