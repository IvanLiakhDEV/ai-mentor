import React from 'react';
import { Box } from '@/components/box/Box';
import { Button } from '@/components/ui/Button';
import { useEditProfile } from '@/hooks/useUser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileShema } from '@/formValidation/userSchema';
import { InputField } from '@/components/inputs/InputField';
import { toast, Toaster } from 'sonner';
import { Spinner } from '@/components/ui/Spinner';

export const EditProfileForm = ({ user, onCancel, onSave }) => {
    const { mutate: handleEdit, isPending, isError } = useEditProfile();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: user.username || '',
            about: user.about || '',
        },
        resolver: zodResolver(profileShema),
    });

    const onSubmit = data => {
        handleEdit(data, {
            onSuccess: () => {
                onSave();
            },
            onError: error => {
                toast.error(error.response?.data?.message);
            },
        });
    };
    return (
        <Box className='p-6 w-full'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4'>
                <h3 className='text-xl font-bold'>Редагування профілю</h3>

                <InputField
                    label='Нікнейм'
                    placeholder={'username228'}
                    type='text'
                    id='username'
                    {...register('username')}
                    error={errors.username?.message}
                />

                <InputField
                    isTextArea={true}
                    label='Про себе'
                    placeholder={'Розкажіть про себе'}
                    id='about'
                    maxLength={200}
                    {...register('about')}
                    error={errors.about?.message}
                />

                <div className='flex gap-4 justify-end mt-4'>
                    <Button
                        size='lg'
                        variant='secondary'
                        type='button'
                        className='rounded-xl p-4 text-sm'
                        disabled={isPending}
                        onClick={onCancel}>
                        Скасувати
                    </Button>
                    <Button
                        size='lg'
                        type='submit'
                        disabled={isPending}
                        className='bg-cta hover:bg-blue-900  rounded-xl p-4 text-sm'>
                        {isPending ? <Spinner className='h-5 w-5' /> : <p>Зберегти зміни</p>}
                    </Button>
                </div>
            </form>
            <Toaster position='top-center' />
        </Box>
    );
};
