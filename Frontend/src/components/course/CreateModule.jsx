import { moduleValidationSchema } from '@/formValidation/courseSchema';
import { useAddModule } from '@/hooks/useCourse';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '../ui/Dialog';
import { InputField } from '../inputs/InputField';

export const CreateModule = ({ isVisible, onClose, course }) => {
    const { mutate: handleAddModule, isPending, error } = useAddModule();

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
                    onClose();
                    reset();
                },
            },
        );
    };
    return (
        <Dialog
            visible={isVisible}
            headerTitle={'Додати модуль'}
            onClose={onClose}
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
    );
};
