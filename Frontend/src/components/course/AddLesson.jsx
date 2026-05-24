import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@monaco-editor/react';
import { Dialog } from '@/components/dialog/Dialog';
import { InputField } from '@/components/inputs/InputField';
import { lessonValidationSchema } from '@/formValidation/lessonSchema';
import { useAddLesson } from '@/hooks/useLesson';

export const AddLessonDialog = ({ visible, onClose, moduleId, courseId }) => {
    const { mutate: handleAddLesson, isPending, error } = useAddLesson();
    const [activeTab, setActiveTab] = useState('initial');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            moduleId: moduleId,
            courseId: courseId,
            practice: {
                initialCode: '// Напишіть ваш код тут\n',
                testCode: `try {\n    // Вставте ваші перевірки сюди\n    // if (myFunction() !== expected) throw new Error("Помилка");\n    \n    console.log("__ALL_TESTS_PASSED__");\n} catch (error) {\n    console.log(error.message);\n}`,
            },
        },
        resolver: zodResolver(lessonValidationSchema),
    });

    const currentInitialCode = watch('practice.initialCode');
    const currenTestCode = watch('practice.testCode');

    const handleCodeChange = value => {
        if (activeTab === 'initial') {
            setValue('practice.initialCode', value, { shouldValidate: true });
        } else {
            setValue('practice.testCode', value, { shouldValidate: true });
        }
    };

    const onSubmit = data => {
        handleAddLesson(data, {
            onSuccess: () => {
                onClose();
                reset();
                setActiveTab('initial');
            },
        });
    };

    return (
        <Dialog
            visible={visible}
            headerTitle={'Додати урок'}
            onClose={onClose}
            sumbitTitle={'Створити'}
            onSubmit={handleSubmit(onSubmit)}
            isPending={isPending}>
            <InputField
                label={'Назва уроку'}
                {...register('title')}
                error={errors.title?.message}
            />

            <InputField
                label={'Теоретичні відомості'}
                isTextArea={true}
                {...register('theory.content')}
                error={errors.theory?.content?.message}
            />

            <InputField
                label={'Завдання'}
                {...register('practice.taskDescription')}
                error={errors.practice?.taskDescription?.message}
            />

            <div className='border border-slate-700 mt-4 rounded-xl overflow-hidden'>
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
                        language='javascript'
                        value={activeTab === 'initial' ? currentInitialCode : currenTestCode}
                        onChange={handleCodeChange}
                        options={{ minimap: { enabled: false }, fontSize: 14 }}
                    />
                </div>
            </div>

            <InputField
                label={'Кількість очок'}
                type='number'
                {...register('points', { valueAsNumber: true })}
                error={errors.points?.message}
            />

            {error && <p className='text-center text-red-500'>{error.message}</p>}
        </Dialog>
    );
};
