import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@/components/dialog/Dialog';
import { InputField } from '@/components/inputs/InputField';
import { moduleValidationSchema } from '@/formValidation/courseSchema';
import { useEditModule } from '@/hooks/useCourse';

export const EditModuleDialog = ({ visible, onClose, module, courseId }) => {
    const { mutate: handleEditModule, isPending, error } = useEditModule();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: module?.title || '',
            order: module?.order || 0,
        },
        resolver: zodResolver(moduleValidationSchema),
    });

    useEffect(() => {
        if (module) {
            reset({ title: module.title, order: module.order });
        }
    }, [module, reset]);

    const onSubmit = data => {
        handleEditModule(
            { id: courseId, data: { ...data, moduleId: module._id } },
            {
                onSuccess: () => {
                    onClose();
                    reset(data);
                },
            },
        );
    };

    return (
        <Dialog
            visible={visible}
            headerTitle={'Редагувати модуль'}
            onClose={onClose}
            sumbitTitle={'Зберегти зміни'}
            onSubmit={handleSubmit(onSubmit)}
            isPending={isPending}>
            <InputField
                label={'Назва модуля'}
                {...register('title')}
                error={errors.title?.message}
            />
            <InputField
                label={'Порядковий номер'}
                type='number'
                readOnly={true}
                {...register('order', { valueAsNumber: true })}
                error={errors.order?.message}
            />
            {error && <p className='text-center text-red-500'>{error.message}</p>}
        </Dialog>
    );
};
