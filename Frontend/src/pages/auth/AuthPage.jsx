import React, { useState } from 'react';
import { LoginForm } from '../../components/form/login/LoginForm.jsx';
import { RegisterForm } from '../../components/form/register/RegisterForm.jsx';

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='grid self-center gap-2 mb-6 text-center'>
                <h1 className='text-2xl font-bold'>{`${isLogin ? 'З поверненням' : 'Створіть аккаунт'}`}</h1>
                <p className='text-secondary'>{`${isLogin ? 'Увійдіть в аккаунт, щоб продовжити навчання' : 'Щоб розпочати навчання вже зараз'}`}</p>
            </div>
            {isLogin ? <LoginForm onSwitch={() => setIsLogin(false)} /> : <RegisterForm onSwitch={() => setIsLogin(true)} />}
        </div>
    );
};
