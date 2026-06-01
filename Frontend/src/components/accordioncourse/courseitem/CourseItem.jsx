import { useCourseById, useToggleArchiveCourse } from '@/hooks/useCourse';
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/Accordion';
import { LuBookOpen } from 'react-icons/lu';
import { ModuleItem } from '../moduleitem/ModuleItem';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import { Button } from '@/components/ui/Button';
import { FaPlus } from 'react-icons/fa6';
import { Spinner } from '../../ui/Spinner';
import { CreateModule } from '@/components/course/CreateModule';
import { DeleteCourse } from '@/components/course/DeleteCourse';
import { EditCourse } from '@/components/course/EditCourse';
import { toast } from 'sonner';
export const CourseItem = ({ course }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: fullCourseData, isLoading } = useCourseById(course._id, isOpen);
    const { mutate: handleToggleArchive, isPending } = useToggleArchiveCourse(course?._id);
    const [isVisible, setIsVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const onArchive = () => {
        handleToggleArchive(
            {},
            {
                onSuccess: response => {
                    toast.success(response.message);
                },
            },
        );
    };
    return (
        <Accordion
            type='multiple'
            className='border rounded-lg  border-border'>
            <AccordionItem
                key={course._id}
                value={course._id}>
                <AccordionTrigger
                    className='px-6 py-4 border-b  border-border'
                    onClick={() => setIsOpen(!isOpen)}>
                    <div className='w-full'>
                        <div className='flex justify-between text-slate-600 '>
                            <div className='flex items-center space-x-2'>
                                <LuBookOpen className='w-6 h-6' />
                                <h1 className='font-bold text-lg text-gray-900'>{course.title}</h1>
                            </div>
                            <div
                                className='flex gap-1 transition-colors'
                                onClick={e => e.stopPropagation()}>
                                <Button
                                    type='button'
                                    variant='secondary'
                                    onClick={() => onArchive()}>
                                    {isPending ? <Spinner className='h-5 w-5' /> : course?.isArchived ? 'Розархівувати' : 'Архівувати'}
                                </Button>
                                <span
                                    role='button'
                                    className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'
                                    onClick={() => setIsEditing(true)}>
                                    <LuPencil className='w-4 h-4' />
                                </span>
                                <EditCourse
                                    isEditing={isEditing}
                                    onClose={() => setIsEditing(false)}
                                    course={course}
                                />
                                <span
                                    role='button'
                                    className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'
                                    onClick={() => setIsDeleting(true)}>
                                    <LuTrash2 className='w-4 h-4' />
                                </span>
                                <DeleteCourse
                                    isDeleting={isDeleting}
                                    course={course}
                                    onClose={() => setIsDeleting(false)}
                                />
                            </div>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className='bg-gray-100 w-full px-4 py-6 flex flex-col'>
                    <div className='flex justify-between'>
                        <p className='text-sm font-bold text-gray-700'>Модулі курсу</p>
                        <Button
                            size='lg'
                            variant='secondary'
                            className=''
                            onClick={() => setIsVisible(true)}>
                            <FaPlus />
                            <p>Додати модуль</p>
                        </Button>
                        <CreateModule
                            isVisible={isVisible}
                            onClose={() => setIsVisible(false)}
                            course={course}
                        />
                    </div>
                    {isLoading ? (
                        <div className='flex justify-center py-6'>
                            <Spinner />
                        </div>
                    ) : (
                        <div className='space-y-3'>
                            {fullCourseData?.data?.modules?.map(module => (
                                <ModuleItem
                                    key={module._id}
                                    module={module}
                                    courseId={fullCourseData?.data?._id}
                                    language={fullCourseData?.data?.language}
                                />
                            ))}
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
