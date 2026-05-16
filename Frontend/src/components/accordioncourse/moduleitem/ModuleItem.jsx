import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '../../ui/Accordion';
import { LuLayers, LuPencil, LuTrash2 } from 'react-icons/lu';
import { Button } from '../../ui/Button';
import { FaPlus } from 'react-icons/fa6';
import { SortableList } from '../../sortable/SortableList';
import { useAddLesson, useReorderLessons } from '@/hooks/useLesson';
import { lessonValidationSchema } from '@/formValidation/lessonSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/dialog/Dialog';
import { InputField } from '@/components/inputs/InputField';
import { useDeleteModule, useEditModule } from '@/hooks/useCourse';
import { moduleValidationSchema } from '@/formValidation/courseSchema';

export const ModuleItem = ({ module, courseId }) => {
    const { mutate: handleAddLesson, isPending: isAddingLesson, error: addError } = useAddLesson();
    const { mutate: handleReorder } = useReorderLessons();
    const { mutate: handleEditModule, isPending: isEditingModule, error: editError } = useEditModule();
    const { mutate: handleDeleteModule, isPending: isDeletingModule, error: deleteError } = useDeleteModule();

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const moduleId = module._id;

    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        reset: resetAdd,
        formState: { errors: errorsAdd },
    } = useForm({
        defaultValues: {
            moduleId: module._id,
            courseId: courseId,
        },
        resolver: zodResolver(lessonValidationSchema),
    });

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
        formState: { errors: errorsEdit },
    } = useForm({
        defaultValues: {
            title: module.title,
            order: module.order,
        },
        resolver: zodResolver(moduleValidationSchema),
    });

    const onSubmitAdding = data => {
        handleAddLesson(data, {
            onSuccess: () => {
                setIsAdding(false);
                resetAdd();
            },
        });
    };

    const onSubmitEditing = data => {
        handleEditModule(
            { id: courseId, data: { ...data, moduleId } },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    resetEdit(data);
                },
            },
        );
    };
    const onSubmitDeleting = e => {
        e.preventDefault();
        handleDeleteModule(
            { id: moduleId },
            {
                onSuccess: () => {
                    setIsDeleting(false);
                },
            },
        );
    };

    return (
        <>
            <Accordion
                type='multiple'
                className='border rounded-lg border-border bg-white'>
                <AccordionItem
                    key={module._id}
                    value={module._id}>
                    <AccordionTrigger className='px-4 py-4 items-center'>
                        <div className='w-full items-center flex justify-between text-slate-600'>
                            <div className='flex items-center gap-2'>
                                <LuLayers className='w-5 h-5' />
                                <p className='font-medium text-base text-gray-900'>{module.title}</p>
                            </div>
                            <div
                                className='flex gap-1'
                                onClick={e => e.stopPropagation()}>
                                <span
                                    role='button'
                                    className='cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors'
                                    onClick={() => setIsEditing(true)}>
                                    <LuPencil className='w-4 h-4' />
                                </span>
                                <span
                                    role='button'
                                    className='cursor-pointer hover:bg-red-100 p-2 rounded-md transition-colors'
                                    onClick={() => setIsDeleting(true)}>
                                    <LuTrash2 className='w-4 h-4' />
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className='pl-12 pr-2 my-3 space-y-2'>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold'>Уроки модуля</p>
                            <Button
                                size='lg'
                                variant='secondary'
                                className='bg-gray-100'
                                onClick={() => setIsAdding(true)}>
                                <FaPlus />
                                <p>Додати урок</p>
                            </Button>
                        </div>
                        <SortableList
                            lessons={module.lessons}
                            onReorder={reordered => handleReorder(reordered)}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/*  ДОДАВАННЯ УРОКУ */}
            <Dialog
                visible={isAdding}
                headerTitle={'Додати урок'}
                onClose={() => setIsAdding(false)}
                sumbitTitle={'Створити'}
                onSubmit={handleSubmitAdd(onSubmitAdding)}
                isPending={isAddingLesson}>
                <InputField
                    label={'Назва уроку'}
                    {...registerAdd('title')}
                    error={errorsAdd.title?.message}
                />
                <InputField
                    label={'Теоретичні відомості'}
                    isTextArea={true}
                    {...registerAdd('theory.content')}
                    error={errorsAdd.theory?.content?.message}
                />
                <InputField
                    label={'Завдання'}
                    {...registerAdd('practice.taskDescription')}
                    error={errorsAdd.practice?.taskDescription?.message}
                />
                <InputField
                    label={'Початковий код'}
                    {...registerAdd('practice.initialCode')}
                    error={errorsAdd.practice?.initialCode?.message}
                />
                <InputField
                    label={'Очікуваний результат'}
                    {...registerAdd('practice.expectedOutput')}
                    error={errorsAdd.practice?.expectedOutput?.message}
                />
                <InputField
                    label={'Кількість очок'}
                    type='number'
                    {...registerAdd('points', { valueAsNumber: true })}
                    error={errorsAdd.points?.message}
                />
                {addError && <p className='text-center text-red-500'>{addError.message}</p>}
            </Dialog>

            {/*  РЕДАГУВАННЯ МОДУЛЯ */}
            <Dialog
                visible={isEditing}
                headerTitle={'Редагувати модуль'}
                onClose={() => setIsEditing(false)}
                sumbitTitle={'Зберегти зміни'}
                onSubmit={handleSubmitEdit(onSubmitEditing)}
                isPending={isEditingModule}>
                <InputField
                    label={'Назва модуля'}
                    {...registerEdit('title')}
                    error={errorsEdit.title?.message}
                />
                <InputField
                    label={'Порядковий номер'}
                    type='number'
                    readOnly={true}
                    {...registerEdit('order', { valueAsNumber: true })}
                    error={errorsEdit.order?.message}
                />
                {editError && <p className='text-center text-red-500'>{editError.message}</p>}
            </Dialog>
            {/*  ВИДАЛЕННЯ МОДУЛЯ */}

            <Dialog
                visible={isDeleting}
                headerTitle={'Видалити модуль'}
                onClose={() => setIsDeleting(false)}
                sumbitTitle={'Видалити'}
                onSubmit={onSubmitDeleting}
                isPending={isDeletingModule}>
                <h2 className='text-base font-semibold text-red-500'>
                    Ви впевнені, що хочете видалити модуль? <br /> Всі дані модуля будуть видалені, включно з уроками
                </h2>

                {deleteError && <p className='text-center text-red-500'>{deleteError.message}</p>}
            </Dialog>
        </>
    );
};
