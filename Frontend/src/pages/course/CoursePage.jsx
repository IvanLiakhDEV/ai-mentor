import React from 'react';
import { useCourseById } from '@/hooks/useCourse';
import { useNavigate, useParams } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { FaArrowLeft } from 'react-icons/fa6';
import { RxPeople } from 'react-icons/rx';
import { LuBookOpen } from 'react-icons/lu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Box } from '@/components/box/Box';
import { Button } from '@/components/button/Button';
import { useRegisterToCourse } from '@/hooks/useEnrollment';
export const CoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: course, isLoading: isLoadingCourse } = useCourseById(id);
    const { mutate: handleRegister } = useRegisterToCourse();
    const onClick = () => {
        if (course.data.isEnrolled) {
            console.log('TODO redirect');
        } else handleRegister(course.data._id);
    };
    if (isLoadingCourse)
        return (
            <div className='max-w-7xl'>
                <Skeleton className='bg-gray-200 h-60 pt-14' />
                <div className='flex gap-10 pt-6'>
                    <Skeleton className='h-16' />
                    <Skeleton className='h-16' />
                </div>
            </div>
        );

    return (
        <div className='pt-14 mx-auto max-w-7xl px-6 '>
            <div className='flex flex-col gap-7'>
                <button
                    className='flex gap-2 text-secondary items-center font-medium cursor-pointer'
                    onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                    Повернутися до курсів
                </button>
                <div className='bg-gradient-to-r from-[#5b4ccc] to-[#7c6fd6] rounded-lg p-8 mb-8 text-white'>
                    <div className='grid gap-7'>
                        <h1 className='text-4xl font-bold'>{course.data.title}</h1>
                        <h2 className='text-xl'>{course.data.description}</h2>
                    </div>
                    <div className='flex gap-4 mt-6'>
                        <div className='flex gap-2 items-center'>
                            <RxPeople className='w-5 h-5' />
                            <p>{course.data.numOfParticipants}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <LuBookOpen className='w-5 h-5' />
                            <p>{course.data.numberOfLessons} урок</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-6 flex-col md:flex-row'>
                    <Box className='flex-1'>
                        <p className='font-bold text-xl mb-5'>Зміст курсу</p>
                        {course.data.modules.map(module => (
                            <Accordion
                                type='multiple'
                                className='border rounded-lg overflow-hidden border-gray-200 '>
                                <AccordionItem
                                    key={module.title}
                                    value={module.title}>
                                    <AccordionTrigger className='px-6 py-4 border-b bg-gray-100 border-gray-200'>
                                        <p className='text-lg font-bold text-gray-900'>{module.title}</p>
                                    </AccordionTrigger>
                                    {module.lessons.map(lesson => (
                                        <AccordionContent className='px-4 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 cursor-pointer'>
                                            <p className='font-medium text-gray-900 text-[1rem]'>{lesson.title}</p>
                                        </AccordionContent>
                                    ))}
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </Box>
                    <Box className='max-h-min'>
                        <Button
                            title={course.data.isEnrolled ? 'Продовжити навчання' : 'Зареєструватися на курс'}
                            onClick={() => onClick()}
                            className='mx-auto'
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};
