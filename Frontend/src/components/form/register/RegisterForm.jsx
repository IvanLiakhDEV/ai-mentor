import React from 'react';
import { Button } from '@/components/button/Button';
import { InputField } from '@/components/inputs/InputField';
import { MdOutlineEmail, MdOutlineLock, MdPersonOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/formValidation/userSchema';
import { useRegister } from '@/hooks/useAuth';
export const RegisterForm = ({ onSwitch }) => {
    const { mutate: handleRegister, isPending, error } = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = async data => {
        handleRegister(data);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='p-[2rem] shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1)] bg-bg-surface max-w-[28rem] w-full rounded-10 '>
            <div className='flex flex-col gap-6'>
                <InputField
                    label='Нікнейм'
                    placeholder={'username'}
                    type='text'
                    id='nickname'
                    icon={MdPersonOutline}
                    {...register('username')}
                    error={errors.username?.message}
                />
                <InputField
                    label='Електронна адреса'
                    placeholder={'example@email.com'}
                    type='email'
                    id='email'
                    icon={MdOutlineEmail}
                    {...register('email')}
                    error={errors.email?.message}
                />
                <InputField
                    label='Пароль'
                    placeholder='••••••••'
                    type='password'
                    id='password'
                    icon={MdOutlineLock}
                    {...register('password')}
                    error={errors.password?.message}
                />
                <InputField
                    label='Підтвердження пароля'
                    placeholder='••••••••'
                    type='password'
                    id='confirmPassword'
                    icon={MdOutlineLock}
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                />
            </div>
            {error && (
                <p className='-mb-3 text-sm font-medium text-center text-red-500'>{error.response?.data?.message || 'Щось пішло не так'}</p>
            )}

            <footer className='grid gap-5 mt-5'>
                <Button
                    title={`${isPending ? 'Завантаження' : 'Створити аккаунт'}`}
                    isDisabled={isPending}
                    type='submit'
                />
                <p className='font-normal text-center'>
                    Вже маєте аккаунт?&nbsp;
                    <button
                        onClick={onSwitch}
                        type='button'
                        className='font-medium cursor-pointer text-cta'>
                        Увійти
                    </button>
                </p>
            </footer>
        </form>
    );
};
