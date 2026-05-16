import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LuFileText, LuPencil, LuTrash2 } from 'react-icons/lu';
import { Dialog } from '../dialog/Dialog';
import { useDeleteLesson, useEditLesson } from '@/hooks/useLesson';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { lessonValidationSchema } from '@/formValidation/lessonSchema';
import { InputField } from '../inputs/InputField';

export function SortableItem({ lesson }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lesson._id });
    const { mutate: handleEditLesson, isPending: isEditingLesson, error: editError } = useEditLesson(lesson.courseId);
    const { mutate: handleDeleteLesson, isPending: isDeletingLesson, error: deleteError } = useDeleteLesson(lesson.courseId);

    const moduleId = lesson.moduleId;
    const courseId = lesson.courseId;

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const onSubmitEditing = data => {
        handleEditLesson(
            { id: lesson._id, lesson: data },
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
        handleDeleteLesson(
            { id: lesson._id },
            {
                onSuccess: () => {
                    setIsDeleting(false);
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
            moduleId,
            courseId,
            title: lesson.title,
            theory: {
                content: lesson.theory.content,
            },
            practice: {
                taskDescription: lesson.practice.taskDescription,
                initialCode: lesson.practice.initialCode,
                expectedOutput: lesson.practice.expectedOutput,
            },
            points: lesson.points,
        },
        resolver: zodResolver(lessonValidationSchema),
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className='relative'>
            <div
                className='cursor-grab p-1 text-gray-400 absolute translate-1/2 '
                {...attributes}
                {...listeners}>
                ⠿
            </div>
            <div
                key={lesson._id}
                className='flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 hover:border-slate-300 transition-colors mt-2'>
                <div className='flex items-center gap-2 flex-1 ml-5'>
                    <LuFileText className='w-4 h-4' />
                    <span className='text-sm text-gray-700'>{lesson.title}</span>
                </div>
                <div className='flex gap-1'>
                    <button
                        role='button'
                        onClick={() => setIsEditing(!isEditing)}
                        className='cursor-pointer hover:bg-gray-100 p-2  rounded-md transition-colors'>
                        <LuPencil className='w-4 h-4' />
                    </button>
                    <button
                        role='button'
                        onClick={() => setIsDeleting(!isDeleting)}
                        className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'>
                        <LuTrash2 className='w-4 h-4' />
                    </button>
                </div>
            </div>
            <Dialog
                visible={isEditing}
                headerTitle={'Редагувати урок'}
                onClose={() => setIsEditing(false)}
                sumbitTitle={'Зберегти зміни'}
                onSubmit={handleSubmitEdit(onSubmitEditing)}
                isPending={isEditingLesson}>
                <InputField
                    label={'Назва уроку'}
                    {...registerEdit('title')}
                    error={errorsEdit.title?.message}
                />
                <InputField
                    label={'Теоретичні відомості'}
                    isTextArea={true}
                    {...registerEdit('theory.content')}
                    error={errorsEdit.theory?.content?.message}
                />
                <InputField
                    label={'Завдання'}
                    {...registerEdit('practice.taskDescription')}
                    isTextArea={true}
                    error={errorsEdit.practice?.taskDescription?.message}
                />
                <InputField
                    label={'Початковий код'}
                    {...registerEdit('practice.initialCode')}
                    isTextArea={true}
                    error={errorsEdit.practice?.initialCode?.message}
                />
                <InputField
                    label={'Очікуваний результат'}
                    {...registerEdit('practice.expectedOutput')}
                    error={errorsEdit.practice?.expectedOutput?.message}
                />
                <InputField
                    label={'Кількість очок'}
                    type='number'
                    {...registerEdit('points', { valueAsNumber: true })}
                    error={errorsEdit.points?.message}
                />
                {editError && <p className='text-center text-red-500'>{editError.message}</p>}
            </Dialog>
            <Dialog
                visible={isDeleting}
                headerTitle={'Видалити урок'}
                onClose={() => setIsDeleting(false)}
                sumbitTitle={'Видалити'}
                onSubmit={onSubmitDeleting}
                isPending={isDeletingLesson}>
                <h2 className='text-base font-semibold text-red-500'>
                    Ви впевнені, що хочете видалити модуль? <br /> Всі дані модуля будуть видалені, включно з уроками
                </h2>

                {deleteError && <p className='text-center text-red-500'>{deleteError.message}</p>}
            </Dialog>
        </div>
    );
}
