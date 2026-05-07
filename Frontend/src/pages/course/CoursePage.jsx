import { useCourseById } from '@/hooks/useCourse';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { FaArrowLeft } from 'react-icons/fa6';
import { RxPeople } from 'react-icons/rx';
import { LuBookOpen } from 'react-icons/lu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
export const CoursePage = () => {
    const { id } = useParams();
    const { data, isLoading } = useCourseById(id);
    const navigate = useNavigate();

    if (isLoading)
        return (
            <div>
                <Skeleton className='w-full bg-gray-200 h-60' />
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
                    {console.log(data.data.modules.map(value => console.log(value.lessons.map(lesson => lesson.title))))}
                </button>
                <div className='bg-gradient-to-r from-[#5b4ccc] to-[#7c6fd6] rounded-lg p-8 mb-8 text-white'>
                    <div className='grid gap-7'>
                        <h1 className='text-4xl font-bold'>{data.data.title}</h1>
                        <h2 className='text-xl'>{data.data.description}</h2>
                    </div>
                    <div className='flex gap-4 mt-6'>
                        <div className='flex gap-2 items-center'>
                            <RxPeople className='w-5 h-5' />
                            <p>{data.data.numOfParticipants}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <LuBookOpen className='w-5 h-5' />
                            <p>{data.data.numberOfLessons} урок</p>
                        </div>
                    </div>
                </div>
                <div>
                    {data.data.modules.map(module => (
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
                </div>
            </div>
        </div>
    );
};
