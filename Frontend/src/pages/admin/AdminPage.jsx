import React, { useState } from 'react';
import { useCourses, useCreateCourse } from '@/hooks/useCourse';
import { FaPlus } from 'react-icons/fa6';
import { CourseItem } from '@/components/accordioncourse/courseitem/CourseItem';
import { Dialog } from '@/components/dialog/Dialog';
import { InputField } from '@/components/inputs/InputField';
import { courseValidationSchema } from '@/formValidation/courseSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
export const AdminPage = () => {
    const { data: courses, isLoading } = useCourses();
    const { mutate: handleAddCourse, isPending, error } = useCreateCourse();
    const [isVisible, setIsVisible] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(courseValidationSchema),
    });
    const onSubmit = data => {
        handleAddCourse(data, {
            onSuccess: () => {
                setIsVisible(false);
                reset();
            },
        });
    };
    if (isLoading) return <p>Loading</p>;
    return (
        <div className='flex flex-col'>
            <header className='bg-white'>
                <h1 className='font-bold text-2xl p-6 text-gray-900 border-b'>Сторінка для адміністрування курсів</h1>
            </header>
            <main className='flex-1 p-6 space-y-2'>
                <div className='flex justify-between items-center'>
                    <h2>
                        Всього курсів:
                        <span className='font-bold'> {courses?.data?.length}</span>
                    </h2>
                    <Button
                        size='lg'
                        className='text-md bg-cta hover:bg-blue-900'
                        onClick={() => setIsVisible(!isVisible)}>
                        <FaPlus />
                        <p>Додати курс</p>
                    </Button>
                    <Dialog
                        visible={isVisible}
                        headerTitle={'Додати курс'}
                        onClose={() => setIsVisible(!isVisible)}
                        sumbitTitle={'Додати курс'}
                        onSubmit={handleSubmit(onSubmit)}
                        isPending={isPending}>
                        <InputField
                            label={'Назва курсу'}
                            {...register('title')}
                            error={errors.title?.message}
                        />
                        <InputField
                            label={'Опис курсу'}
                            className='h-48 items-start'
                            {...register('description')}
                            isTextArea={true}
                            error={errors.description?.message}
                        />
                        <InputField
                            label={'Теги (через пробіл)'}
                            {...register('tags')}
                            error={errors.tags?.message}
                        />
                        {error && <p className='text-center'>{error.message || 'Щось пішло не так'}</p>}
                    </Dialog>
                </div>
                <div className='space-y-3'>
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
                        {courses.data.map(course => (
                            <CourseItem
                                course={course}
                                key={course._id}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
