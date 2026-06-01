import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { MdPersonOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '@/store/selectors/themeSelectors';
import { toggleTheme } from '@/store/slices/themeSlice';
import { LuLogOut, LuMoon, LuSun } from 'react-icons/lu';
import { useLogOut } from '@/hooks/useUser';
import { toast } from 'sonner';
export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mutate: handleLogOut } = useLogOut();
    const theme = useSelector(selectTheme);
    const baseStyles = 'py-2 px-3 transition-colors duration-200 rounded-md';
    const activeStyles = 'bg-cta font-semibold text-white';
    const inactiveStyles =
        'text-secondary hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 dark:text-gray-300';

    const getClassName = ({ isActive }) => `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;

    const onLogOut = () => {
        handleLogOut(
            {},
            {
                onError: () => {
                    toast.error('Помилка виходу, спробуйте пізніше');
                },
            },
        );
    };

    return (
        <header className='w-full border-b border-border  bg-bg-surface'>
            <div className='flex items-center justify-between px-6 py-2 mx-auto max-w-7xl'>
                <div className='flex items-center'>
                    <div className='mr-10 text-2xl font-bold text-cta'>Logo</div>
                    <nav>
                        <ul className='flex gap-6 list-none'>
                            <li>
                                <NavLink
                                    to='/'
                                    className={getClassName}>
                                    Catalog
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/leaderboard'
                                    className={getClassName}>
                                    Leaderboard
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='flex gap-2'>
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className='p-2 text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-300   transition-all rounded-md hover:text-gray-900 hover:bg-gray-100'
                        title='Зміна теми додатку'>
                        {theme === 'light' ? <LuMoon className='w-6 h-6' /> : <LuSun className='w-6 h-6' />}
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className='p-2 text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-300   transition-all rounded-md hover:text-gray-900 hover:bg-gray-100'
                        title='Мій профіль'>
                        <MdPersonOutline className='w-6 h-6' />
                    </button>
                    <button
                        onClick={() => onLogOut()}
                        className='p-2 text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-300   transition-all rounded-md hover:text-gray-900 hover:bg-gray-100'
                        title='Вихід'>
                        <LuLogOut className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </header>
    );
};
