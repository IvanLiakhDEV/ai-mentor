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
import { Editor } from '@monaco-editor/react';
import { TextEditor } from '../editor/TextEditor';

export function SortableItem({ lesson, language }) {
    const [activeTab, setActiveTab] = useState('initial');
    const [activeTabText, setActiveTabText] = useState('theory');

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
                    setActiveTab('initial');
                    setActiveTabText('theory');
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
        watch,
        setValue,
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
                testCode: lesson.practice.testCode,
            },
            points: lesson.points,
        },
        resolver: zodResolver(lessonValidationSchema),
    });
    const currentInitialCode = watch('practice.initialCode');
    const currentTestCode = watch('practice.testCode');
    const handleCodeChange = value => {
        if (activeTab === 'initial') {
            setValue('practice.initialCode', value, { shouldValidate: true });
        } else {
            setValue('practice.testCode', value, { shouldValidate: true });
        }
    };
    const handleTextChange = value => {
        console.log(value);

        if (activeTabText === 'theory') {
            setValue('theory.content', value, { shouldValidate: true });
        } else {
            setValue('practice.taskDescription', value, { shouldValidate: true });
        }
    };
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
                <div>
                    <div className='flex bg-slate-800 '>
                        <button
                            type='button'
                            onClick={() => setActiveTabText('theory')}
                            className={`px-6 py-3 font-medium text-sm transition-colors ${
                                activeTabText === 'theory'
                                    ? 'bg-slate-900 text-blue-400 border-t-2 border-blue-500'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}>
                            Теоретичні відомості
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTabText('practice')}
                            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2  ${
                                activeTabText === 'practice'
                                    ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-500'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}>
                            <span>Практика</span>
                        </button>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <TextEditor
                            key={activeTabText}
                            content={watch(activeTabText === 'theory' ? 'theory.content' : 'practice.taskDescription')}
                            onChange={handleTextChange}
                        />
                        {activeTabText === 'theory' && errorsEdit.theory?.content && (
                            <p className='text-sm text-red-500'>{errorsEdit.theory.content.message}</p>
                        )}
                        {activeTabText === 'practice' && errorsEdit.practice?.taskDescription && (
                            <p className='text-sm text-red-500'>{errorsEdit.practice.taskDescription.message}</p>
                        )}
                    </div>
                </div>

                <div className='border border-slate-700 mt-4 rounded-xl overflow-hidden min-h-80'>
                    <div className='flex bg-slate-800 '>
                        <button
                            type='button'
                            onClick={() => setActiveTab('initial')}
                            className={`px-6 py-3 font-medium text-sm transition-colors ${
                                activeTab === 'initial'
                                    ? 'bg-slate-900 text-blue-400 border-t-2 border-blue-500'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}>
                            Початковий код
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTab('test')}
                            className={`px-6 py-3 font-medium text-sm transition-colors flex items-center gap-2  ${
                                activeTab === 'test'
                                    ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-500'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}>
                            <span>Код перевірки</span>
                        </button>
                    </div>

                    <div className='h-90 bg-slate-900 '>
                        <Editor
                            height='100%'
                            theme='vs-dark'
                            language={language || 'javascript'}
                            value={activeTab === 'initial' ? currentInitialCode : currentTestCode}
                            onChange={handleCodeChange}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                </div>
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
                <h2 className='text-base font-semibold text-red-500'>Ви впевнені, що хочете видалити урок?</h2>

                {deleteError && <p className='text-center text-red-500'>{deleteError.message}</p>}
            </Dialog>
        </div>
    );
}
