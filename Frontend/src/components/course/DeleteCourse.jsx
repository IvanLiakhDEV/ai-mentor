import React from 'react';
import { useDeleteCourse } from '@/hooks/useCourse';
import { Dialog } from '../ui/Dialog';

export const DeleteCourse = ({ isDeleting, onClose, course }) => {
    const { mutate: handleDeleteCourse, isPending: isDeletingCourse, error: deleteError } = useDeleteCourse();

    const onSubmitDeleting = e => {
        e.preventDefault();
        handleDeleteCourse(
            { id: course._id },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };
    return (
        <Dialog
            visible={isDeleting}
            headerTitle={'Видалити курс'}
            onClose={onClose}
            sumbitTitle={'Видалити'}
            onSubmit={onSubmitDeleting}
            isPending={isDeletingCourse}>
            <h2 className='text-base font-semibold text-red-500'>
                Ви впевнені, що хочете видалити курс? <br /> Всі дані курсу будуть видалені, включно з модулями та уроками
            </h2>
            {deleteError && <p className='text-center text-red-500'>{deleteError.message}</p>}
        </Dialog>
    );
};
