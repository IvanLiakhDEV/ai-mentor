import React from 'react';
import { courseValidationSchema } from '@/formValidation/courseSchema';
import { useEditCourse } from '@/hooks/useCourse';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog } from '../ui/Dialog';
import { InputField } from '../inputs/InputField';

export const EditCourse = ({ isEditing, onClose, course }) => {
    const { mutate: handleEditModule, isPending: isEditingCourse, error: editError } = useEditCourse();

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

    const onSubmitEditing = data => {
        handleEditModule(
            { id: course._id, data },
            {
                onSuccess: () => {
                    onClose();
                    resetEdit(data);
                },
            },
        );
    };
    return (
        <Dialog
            visible={isEditing}
            headerTitle={'Редагувати курс'}
            onClose={onClose}
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
    );
};
