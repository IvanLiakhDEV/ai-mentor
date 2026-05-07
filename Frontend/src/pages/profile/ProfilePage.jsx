import { Button } from '@/components/button/Button';
import { selectUser } from '@/store/selectors/authSelectors';
import React from 'react';
import { MdOutlineEmail, MdOutlineLocationOn, MdOutlineCalendarToday } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';
import { useSelector } from 'react-redux';
export const ProfilePage = () => {
    const user = useSelector(selectUser);
    return (
        <div className='px-4'>
            <div className='flex p-8 mt-10 border border-gray-200 rounded-md shadow-sm bg-bg-surface text-secondary'>
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
            </div>
        </div>
    );
};
