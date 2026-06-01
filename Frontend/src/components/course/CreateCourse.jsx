import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courseValidationSchema, LANGUAGES } from '@/formValidation/courseSchema';
import { Dialog } from '@/components/ui/Dialog';
import { InputField } from '@/components/inputs/InputField';
import { useForm, Controller } from 'react-hook-form';
import { useCreateCourse } from '@/hooks/useCourse';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateCourse = ({ isVisible, onClose }) => {
    const { mutate: handleAddCourse, isPending, error } = useCreateCourse();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            language: 'javascript',
        },
        resolver: zodResolver(courseValidationSchema),
    });
    const onSubmit = data => {
        handleAddCourse(data, {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };
    return (
        <Dialog
            visible={isVisible}
            headerTitle={'Додати курс'}
            onClose={onClose}
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

            <Controller
                name='language'
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className='w-full py-5 bg-white'>
                            <SelectValue placeholder='Мова програмування' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {LANGUAGES?.map(lang => (
                                    <SelectItem
                                        key={lang}
                                        value={lang}>
                                        {lang}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            {error && <p className='text-center'>{error.message || 'Щось пішло не так'}</p>}
        </Dialog>
    );
};
