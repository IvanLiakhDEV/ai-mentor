import React from 'react';
import { Button } from '@/components/button/Button';
import { InputField } from '@/components/inputs/InputField';
import { MdOutlineEmail, MdOutlineLock, MdPersonOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/formValidation/userSchema';
import { useLogin } from '@/hooks/useAuth';

export const LoginForm = ({ onSwitch }) => {
    const { mutate: handleLogin, isPending, error } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async data => {
        handleLogin(data);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='p-[2rem] shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1)] bg-bg-surface max-w-[28rem] w-full rounded-10 '>
            <div className='flex flex-col gap-6 '>
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
            </div>
            <div className='flex justify-end mt-1 mb-3'>
                <a
                    href='#'
                    className='font-semibold text-cta'>
                    Забули пароль?
                </a>
            </div>
            {error && (
                <p className='mb-3 text-sm font-medium text-center text-red-500 '>{error.response?.data?.message || 'Щось пішло не так'}</p>
            )}
            <footer className='grid gap-5'>
                <Button
                    title={`${isPending ? 'Завантаження' : 'Увійти'}`}
                    isDisabled={isPending}
                    type='submit'
                />
                <p className='font-normal text-center'>
                    Ще не маєте аккаунту?&nbsp;
                    <button
                        onClick={onSwitch}
                        type='button'
                        className='font-medium cursor-pointer text-cta'>
                        Створити
                    </button>
                </p>
            </footer>
        </form>
    );
};
