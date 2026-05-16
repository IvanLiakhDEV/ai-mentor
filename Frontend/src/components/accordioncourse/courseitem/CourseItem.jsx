import { useAddModule, useCourseById, useDeleteCourse, useEditCourse } from '@/hooks/useCourse';
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/Accordion';
import { LuBookOpen } from 'react-icons/lu';
import { ModuleItem } from '../moduleitem/ModuleItem';
import { LuPencil, LuTrash2, LuLayers } from 'react-icons/lu';
import { Button } from '../../ui/Button';
import { FaPlus } from 'react-icons/fa6';
import { Spinner } from '../../ui/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseValidationSchema, moduleValidationSchema } from '@/formValidation/courseSchema';
import { Dialog } from '@/components/dialog/Dialog';
import { useForm } from 'react-hook-form';
import { InputField } from '@/components/inputs/InputField';
export const CourseItem = ({ course }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: fullCourseData, isLoading } = useCourseById(course._id, isOpen);
    const { mutate: handleAddModule, isPending, error } = useAddModule();
    const { mutate: handleDeleteCourse, isPending: isDeletingCourse, error: deleteError } = useDeleteCourse();
    const { mutate: handleEditModule, isPending: isEditingCourse, error: editError } = useEditCourse();

    const [isVisible, setIsVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
                id: course._id,
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
    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
        formState: { errors: errorsEdit },
    } = useForm({
        defaultValues: {
            title: course.title,
            description: course.description,
            tags: course.tags.join(' '),
        },
        resolver: zodResolver(courseValidationSchema),
    });
    const onSubmitDeleting = e => {
        e.preventDefault();
        handleDeleteCourse(
            { id: course._id },
            {
                onSuccess: () => {
                    setIsDeleting(false);
                },
            },
        );
    };
    const onSubmitEditing = data => {
        handleEditModule(
            { id: course._id, data },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    resetEdit(data);
                },
            },
        );
    };

    return (
        <>
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
                                    <span
                                        role='button'
                                        className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'
                                        onClick={() => setIsEditing(true)}>
                                        <LuPencil className='w-4 h-4' />
                                    </span>

                                    <span
                                        role='button'
                                        className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'
                                        onClick={() => setIsDeleting(true)}>
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
            <Dialog
                visible={isDeleting}
                headerTitle={'Видалити курс'}
                onClose={() => setIsDeleting(false)}
                sumbitTitle={'Видалити'}
                onSubmit={onSubmitDeleting}
                isPending={isDeletingCourse}>
                <h2 className='text-base font-semibold text-red-500'>
                    Ви впевнені, що хочете видалити курс? <br /> Всі дані курсу будуть видалені, включно з модулями та уроками
                </h2>

                {deleteError && <p className='text-center text-red-500'>{deleteError.message}</p>}
            </Dialog>
            <Dialog
                visible={isEditing}
                headerTitle={'Редагувати курс'}
                onClose={() => setIsEditing(!isEditing)}
                sumbitTitle={'Зберегти зміни'}
                onSubmit={handleSubmitEdit(onSubmitEditing)}
                isPending={isEditingCourse}>
                <InputField
                    label={'Назва курсу'}
                    {...registerEdit('title')}
                    error={errorsEdit.title?.message}
                />
                <InputField
                    label={'Опис курсу'}
                    className='h-48 items-start'
                    {...registerEdit('description')}
                    isTextArea={true}
                    error={errorsEdit.description?.message}
                />
                <InputField
                    label={'Теги (через пробіл)'}
                    {...registerEdit('tags')}
                    error={errorsEdit.tags?.message}
                />
                {editError && <p className='text-center'>{editError.message || 'Щось пішло не так'}</p>}
            </Dialog>
        </>
    );
};
