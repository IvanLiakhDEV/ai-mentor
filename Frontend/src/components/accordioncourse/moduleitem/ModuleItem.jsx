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

export const ModuleItem = ({ module, courseId }) => {
    const { mutate: handleAddLesson, isPending, error } = useAddLesson();
    const [isVisible, setIsVisible] = useState(false);
    const { mutate: handleReorder } = useReorderLessons();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            moduleId: module._id,
            courseId: courseId,
        },
        resolver: zodResolver(lessonValidationSchema),
    });
    const onSubmit = data => {
        handleAddLesson(data, {
            onSuccess: () => {
                setIsVisible(false);
                reset();
            },
        });
    };
    return (
        <Accordion
            type='multiple'
            className='border rounded-lg  border-border bg-white'>
            <AccordionItem
                key={module._id}
                value={module._id}>
                <AccordionTrigger className='px-4 py-4  items-center '>
                    <div className='w-full items-center flex justify-between text-slate-600'>
                        <div className='flex items-center gap-2'>
                            <LuLayers className='w-5 h-5' />
                            <p className='font-medium text-base text-gray-900'>{module.title}</p>
                        </div>
                        <div
                            className='flex gap-1 transition-colors'
                            onClick={e => e.stopPropagation()}>
                            <span
                                role='button'
                                className='cursor-pointer hover:bg-gray-100 p-2  rounded-md transition-colors'>
                                <LuPencil className='w-4 h-4' />
                            </span>
                            <span
                                role='button'
                                className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'>
                                <LuTrash2 className='w-4 h-4' />
                            </span>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className='pl-12 pr-2 my-3  space-y-2'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <p>Уроки модуля</p>
                            <Button
                                size='lg'
                                variant='secondary'
                                className='bg-gray-100'
                                onClick={() => setIsVisible(!isVisible)}>
                                <FaPlus />
                                <p>Додати урок</p>
                            </Button>
                            <Dialog
                                visible={isVisible}
                                headerTitle={'Додати урок'}
                                onClose={() => setIsVisible(!isVisible)}
                                sumbitTitle={'Додати урок'}
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
                                <InputField
                                    label={'Початковий код'}
                                    {...register('practice.initialCode')}
                                    error={errors.practice?.initialCode?.message}
                                />
                                <InputField
                                    label={'Очікуваний результат'}
                                    {...register('practice.expectedOutput')}
                                    error={errors.practice?.expectedOutput?.message}
                                />
                                <InputField
                                    label={'Кількість очок за проходження'}
                                    type='number'
                                    {...register('points', { valueAsNumber: true })}
                                    error={errors.points?.message}
                                />
                                {error && <p className='text-center'>{error.message || 'Щось пішло не так'}</p>}
                            </Dialog>
                        </div>
                        <SortableList
                            lessons={module.lessons}
                            onReorder={reordered => handleReorder(reordered)}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
