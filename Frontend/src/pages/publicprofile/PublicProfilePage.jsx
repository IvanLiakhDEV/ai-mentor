import { Achivement } from '@/components/achivement/Achivement';
import { Box } from '@/components/box/Box';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAllAchievements } from '@/hooks/useAchievement';
import { useGetProfile } from '@/hooks/useUser';
import React from 'react';
import { LuAward, LuBookOpen, LuTarget, LuTrophy } from 'react-icons/lu';
import { MdOutlineCalendarToday, MdOutlineEmail } from 'react-icons/md';
import { useParams } from 'react-router';
import { Toaster } from 'sonner';

export const PublicProfilePage = () => {
    const { id } = useParams();
    const { data: user, isPending } = useGetProfile(id);
    const { data: achievements, isLoadingAchievements } = useAllAchievements();

    if (isPending || isLoadingAchievements)
        return (
            <div className='max-w-7xl w-full h-full mx-auto flex-col gap-10 flex mt-10'>
                <Skeleton className='bg-slate-200 dark:bg-slate-800 w-full h-100' />
                <Skeleton className='bg-slate-200 dark:bg-slate-800 w-full h-200' />
            </div>
        );

    return (
        <div className='px-6 mx-auto max-w-7xl pt-14'>
            <Box>
                <header className='flex flex-col'>
                    <div className='flex items-start justify-between w-full'>
                        <div className='flex items-center gap-7'>
                            <div className='w-20 h-20 rounded-full bg-bg-primary flex items-center justify-center'>
                                {user.user?.avatar ? (
                                    <img
                                        className='w-20 h-20 rounded-full bg-bg-primary  overflow-hidden'
                                        src={user.user?.avatar?.trim()}
                                    />
                                ) : (
                                    <p className='text-secondary font-semibold text-3xl'>{user.user?.username[0]?.toUpperCase()}</p>
                                )}
                            </div>
                            <div className='grid gap-4'>
                                <h3 className='text-3xl font-bold text-primary'>{user?.user?.username}</h3>
                                <div className='text-secondary'>
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail />
                                        <p>{user?.user?.email}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineCalendarToday />
                                        <p>
                                            Приєднався&nbsp;
                                            {new Date(user?.user?.createdAt).toLocaleDateString('uk-UA', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-8 space-y-6'>
                        <hr />
                        <span>{user?.user?.about}</span>
                    </div>
                </header>
            </Box>

            <div className='flex lg:flex-row flex-col justify-between mt-7 gap-4 '>
                <Box className='flex-col gap-6 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuBookOpen className='text-blue-600 w-6 h-6' />
                        <p className='text-secondary font-semibold'>Пройдених курсів</p>
                    </div>
                    <p className='font-bold text-3xl'>{user.userStat?.coursesCompleted}</p>
                </Box>
                <Box className='flex-col gap-4 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuTrophy className='w-6 h-6 text-yellow-600' />
                        <p className='text-secondary font-semibold'>Кількість очок</p>
                    </div>
                    <p className='font-bold text-3xl'>{user.userStat?.points}</p>
                </Box>
                <Box className='flex-col gap-4 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuTrophy className='w-6 h-6 text-yellow-600' />
                        <p className='text-secondary font-semibold'>Поточна серія</p>
                    </div>
                    <p className='font-bold text-3xl'>{user.userStat?.currentStreak || 0}</p>
                </Box>
                <Box className='flex-col gap-4 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuTarget className='w-6 h-6 text-red-600' />
                        <p className='text-secondary font-semibold'>Найкраща серія</p>
                    </div>
                    <p className='font-bold text-3xl'>{user.userStat?.bestStreak || 0}</p>
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
                        key={achievement._id}
                        isCompleted={user?.userAchievements?.some(value => value.achievementId === achievement._id)}
                    />
                ))}
            </Box>

            <Toaster position='top-center' />
        </div>
    );
};
