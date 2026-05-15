import { useAddModule, useCourseById } from '@/hooks/useCourse';
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/Accordion';
import { LuBookOpen } from 'react-icons/lu';
import { ModuleItem } from '@/components/accordioncourse/moduleitem/ModuleItem';
import { LuPencil, LuTrash2, LuLayers } from 'react-icons/lu';
import { Button } from '../../ui/Button';
import { FaPlus } from 'react-icons/fa6';
import { Spinner } from '../../ui/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { moduleValidationSchema } from '@/formValidation/courseSchema';
import { Dialog } from '@/components/dialog/Dialog';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/inputs/InputField';
export const CourseItem = ({ course }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: fullCourseData, isLoading } = useCourseById(course._id, isOpen);
    const { mutate: handleAddModule, isPending, error } = useAddModule();
    const [isVisible, setIsVisible] = useState(false);
    const id = course._id;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(moduleValidationSchema),
    });
    const onSubmit = data => {
        handleAddModule(
            {
                id,
                ...data,
            },
            {
                onSuccess: () => {
                    setIsVisible(false);
                    reset();
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
                            <div
                                className='flex items-center space-x-2'
                                onClick={e => e.stopPropagation()}>
                                <LuBookOpen className='w-6 h-6' />
                                <h1 className='font-bold text-lg text-gray-900'>{course.title}</h1>
                            </div>
                            <div className='flex gap-1 transition-colors'>
                                <span
                                    role='button'
                                    className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'>
                                    <LuPencil className='w-4 h-4' />
                                </span>
                                <span
                                    role='button'
                                    className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'>
                                    <LuTrash2 className='w-4 h-4' />
                                </span>
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
                            onClick={() => setIsVisible(!isVisible)}>
                            <FaPlus />
                            <p>Додати модуль</p>
                        </Button>
                        <Dialog
                            visible={isVisible}
                            headerTitle={'Додати модуль'}
                            onClose={() => setIsVisible(!isVisible)}
                            sumbitTitle={'Додати модуль'}
                            onSubmit={handleSubmit(onSubmit)}
                            isPending={isPending}>
                            <InputField
                                label={'Назва модуля'}
                                {...register('title')}
                                error={errors.title?.message}
                            />
                            <InputField
                                label={'Порядковий номер'}
                                {...register('order', { valueAsNumber: true })}
                                error={errors.order?.message}
                            />
                            {error && <p className='text-center'>{error.message || 'Щось пішло не так'}</p>}
                        </Dialog>
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
                                />
                            ))}
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
