import React, { useState } from 'react';
import { Box } from '@/components/box/Box';
import { Button } from '@/components/ui/Button';
import { useEditProfile } from '@/hooks/useUser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileShema } from '@/formValidation/userSchema';
import { InputField } from '@/components/inputs/InputField';
import { toast, Toaster } from 'sonner';
import { Spinner } from '@/components/ui/Spinner';
import imageCompression from 'browser-image-compression';
export const EditProfileForm = ({ user, onCancel, onSave }) => {
    const { mutate: handleEdit, isPending } = useEditProfile();
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user.avatar || '');
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({
        defaultValues: {
            username: user.username || '',
            about: user.about || '',
        },
        resolver: zodResolver(profileShema),
    });

    const onSubmit = data => {
        const formData = new FormData();
        if (dirtyFields.username) formData.append('username', data.username);
        if (dirtyFields.about) formData.append('about', data.about);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        const hasTextChanges = Object.keys(dirtyFields).length > 0;
        if (!hasTextChanges && !avatarFile) {
            onCancel();
            return;
        }
        handleEdit(formData, {
            onSuccess: () => {
                toast.success('Профіль успішно оновлено!');
                onSave();
            },
            onError: error => {
                toast.error(error.response?.data?.message || 'При збереженні змін виникла помилка');
            },
        });
    };
    async function handleImageUpload(event) {
        const imageFile = event.target.files[0];
        if (!imageFile) return;
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(imageFile, options);
            setAvatarFile(compressedFile);
            setPreviewUrl(URL.createObjectURL(compressedFile));
        } catch {
            toast.error('Не вдалося обробити зображення, спробуйте пізніше');
        }
    }
    return (
        <Box className='p-6 w-full'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4'>
                <h3 className='text-xl font-bold'>Редагування профілю</h3>
                <div className='relative w-40 h-40 rounded-full overflow-hidden bg-bg-secondary border-2 border-dashed border-border mx-auto'>
                    {previewUrl || user.avatar ? (
                        <img
                            src={previewUrl || user.avatar}
                            alt='Avatar Preview'
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <span className='text-xs text-gray-500 flex items-center justify-center h-full text-center'>Без фото</span>
                    )}
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        title='Натисніть, щоб змінити фото'
                    />
                </div>
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
