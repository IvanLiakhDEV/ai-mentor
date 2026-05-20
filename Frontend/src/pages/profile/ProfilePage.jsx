import { Button } from '@/components/button/Button';
import { selectUser } from '@/store/selectors/authSelectors';
import React from 'react';
import { MdOutlineEmail, MdOutlineLocationOn, MdOutlineCalendarToday } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Box } from '@/components/box/Box';

import { LuAward, LuBookOpen, LuTrophy } from 'react-icons/lu';
import { useAllAchievements, useMyAchievements } from '@/hooks/useAchievement';
import { Achivement } from '@/components/achivement/Achivement';
export const ProfilePage = () => {
    const user = useSelector(selectUser);
    const { data: achievements, isLoadingAchievements } = useAllAchievements();
    const { data: userAchievements, isLoadingUserAchievements } = useMyAchievements();

    if (isLoadingUserAchievements && isLoadingAchievements)
        return (
            <div className='max-w-7xl w-full h-full mx-auto'>
                <Skeleton className='bg-slate-200 dark:bg-slate-800 w-full h-100' />
            </div>
        );
    return (
        <div className='px-6 mx-auto max-w-7xl pt-14'>
            <Box>
                <header className='flex items-start justify-between w-full '>
                    <div className='flex items-center gap-7'>
                        <div className='w-20 h-20 rounded-full bg-bg-primary'></div>
                        <div className='grid gap-4'>
                            <h3 className='text-2xl font-bold text-primary'>{user.username}</h3>
                            <div>
                                <div className='flex items-center gap-1'>
                                    <MdOutlineEmail />
                                    <p>{user.email}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <MdOutlineCalendarToday />
                                    <p>
                                        Приєднався&nbsp;
                                        {new Date(user.createdAt).toLocaleDateString('uk-UA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        title={'Редагувати профіль'}
                        prefixIcon={HiOutlinePencil}
                    />
                </header>
            </Box>
            <div className='flex lg:flex-row flex-col justify-between mt-7 gap-4 '>
                <Box className='flex-col gap-6 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuBookOpen className='text-blue-600 w-6 h-6' />
                        <p className='text-secondary font-semibold'>Пройдених курсів</p>
                    </div>
                    <p className='font-bold text-3xl'>{userAchievements?.data?.stats?.coursesCompleted}</p>
                </Box>
                <Box className='flex-col gap-4 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuTrophy className='w-6 h-6 text-yellow-600' />
                        <p className='text-secondary font-semibold'>Кількість очок</p>
                    </div>
                    <p className='font-bold text-3xl'>{userAchievements?.data?.stats?.points}</p>
                </Box>
            </div>
            <Box className='flex flex-col mt-6 '>
                <div className='flex gap-2 items-center'>
                    <LuAward className=' w-6 h-6 text-[#5b4ccc]' />
                    <h1 className='text-2xl font-bold text-primary'>Досягнення</h1>
                </div>
                {achievements?.data?.map(achievement => (
                    <Achivement
                        achivement={achievement}
                        isCompleted={userAchievements?.data?.achievements?.some(value => value.achievementId?._id === achievement._id)}
                    />
                ))}
            </Box>
        </div>
    );
};
