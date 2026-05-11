import React from 'react';
import { Box } from '../box/Box';
import { LuAward, LuTrendingUp, LuMedal } from 'react-icons/lu';
import { useLeaderboard } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/authSelectors';
export const Leaderboard = () => {
    const { data: leaderboard, isLoading } = useLeaderboard();
    const user = useSelector(selectUser);
    if (isLoading) return <p>Loading</p>;

    const getRank = index => {
        if (index === 0) return <LuMedal className='text-yellow-600 w-6 h-6 ' />;
        if (index === 1) return <LuMedal className='text-gray-400 w-6 h-6' />;
        if (index === 2) return <LuMedal className='text-orange-600 w-6 h-6' />;
        return `#${index + 1}`;
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex lg:flex-row flex-col justify-between mt-2 gap-4 '>
                <Box className='flex-col gap-6 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuAward className='text-blue-600 w-6 h-6' />
                        <p className='text-secondary font-semibold'>Кількість користувачів</p>
                    </div>
                    <p className='font-bold text-3xl'>{leaderboard.data.totalUsers}</p>
                </Box>
                <Box className='flex-col gap-4 flex p-6 flex-1'>
                    <div className='flex gap-2'>
                        <LuTrendingUp className='w-6 h-6 text-yellow-600' />
                        <p className='text-secondary font-semibold'>Загальна кількість очок</p>
                    </div>
                    <p className='font-bold text-3xl'>{leaderboard.data.totalPoints}</p>
                </Box>
            </div>
            <Box className='p-0 rounded-2xl'>
                <table className='w-full rounded-md'>
                    <thead className='bg-gray-50'>
                        <tr className='text-secondary text-left text-sm font-semibold '>
                            <th className='px-6 py-4'>Ранг</th>
                            <th className='px-6'>Користувач</th>
                            <th className='px-6'>Кількість очок</th>
                            <th className='px-6'>Кількість курсів</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard &&
                            leaderboard.data.leaderboard.map((value, index) => (
                                <tr className={`border-b ${value.username === user.username && 'bg-slate-200'}`}>
                                    <td className='text-secondary font-semibold px-6 py-4'>{getRank(index)}</td>
                                    <td className='px-6 py-4'>{value.username}</td>
                                    <td className='text-blue-600 font-semibold px-6 py-4'>{value.points}</td>
                                    <td className='font-semibold px-6 py-4'>{value.completedCourses}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Box>
        </div>
    );
};
