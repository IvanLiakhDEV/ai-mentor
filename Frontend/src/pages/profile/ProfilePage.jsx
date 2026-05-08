import { Button } from '@/components/button/Button';
import { selectUser } from '@/store/selectors/authSelectors';
import React from 'react';
import { MdOutlineEmail, MdOutlineLocationOn, MdOutlineCalendarToday } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Box } from '@/components/box/Box';
import { useUserEnrollments } from '@/hooks/useEnrollment';
export const ProfilePage = () => {
    const { data, isLoading } = useUserEnrollments();
    const user = useSelector(selectUser);
    if (isLoading) return <p>Loading</p>;
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
                                {/* <div className='flex items-center gap-1'>
                                    <MdOutlineLocationOn />
                                    <p>{user.email}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <MdOutlineCalendarToday />
                                    <p>Приєднався в Квітні 2026</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <Button
                        title={'Редагувати профіль'}
                        prefixIcon={HiOutlinePencil}
                    />
                </header>
            </Box>
            <div className='flex'>
                <Box className='flex-col'>
                    <p>Пройдених курсів</p>
                    {data.data.filter(value => value.status === 'Completed').reduce((value, acc) => acc + value, 0)}
                    {console.log(data.data)}
                </Box>
            </div>
        </div>
    );
};
