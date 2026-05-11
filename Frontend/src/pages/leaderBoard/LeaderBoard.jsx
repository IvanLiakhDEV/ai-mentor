import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Box } from '@hugeicons/core-free-icons';
import React from 'react';

export const LeaderBoardPage = () => {
    return (
        <div className='flex flex-col mx-auto'>
            <section className='w-full bg-cta'>
                <div className='grid gap-10 px-6 py-16 mx-auto text-white max-w-7xl'>
                    <h1 className='text-5xl font-semibold '>Таблиця лідерів</h1>
                    <h2 className='text-xl'>Пройди урок - покращиш рейтинг</h2>
                </div>
            </section>
            <div className='grid w-full px-6 mx-auto mt-2 max-w-7xl py-12 pt-4'>
                <h2 className='text-3xl font-bold mb-2 text-gray-900'>Глобальна таблиця лідерів</h2>
                <p className='text-gray-600'>Топ користувачів за кількістю здобутих очків</p>
                <Leaderboard />
            </div>
        </div>
    );
};
