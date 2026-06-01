import React from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { useDeleteModule } from '@/hooks/useCourse';

export const DeleteModuleDialog = ({ visible, onClose, moduleId }) => {
    const { mutate: handleDeleteModule, isPending, error } = useDeleteModule();

    const onSubmit = e => {
        e.preventDefault();
        handleDeleteModule(
            { id: moduleId },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <Dialog
            visible={visible}
            headerTitle={'Видалити модуль'}
            onClose={onClose}
            sumbitTitle={'Видалити'}
            onSubmit={onSubmit}
            isPending={isPending}>
            <h2 className='text-base font-semibold text-red-500'>
                Ви впевнені, що хочете видалити модуль? <br /> Всі дані модуля будуть видалені, включно з уроками.
            </h2>
            {error && <p className='text-center text-red-500'>{error.message}</p>}
        </Dialog>
    );
};
