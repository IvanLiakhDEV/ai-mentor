import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { MdPersonOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '@/store/selectors/themeSelectors';
import { toggleTheme } from '@/store/slices/themeSlice';
import { LuMoon, LuSun } from 'react-icons/lu';
export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const baseStyles = 'py-2 px-3 transition-colors duration-200 rounded-md';
    const activeStyles = 'bg-cta font-semibold text-white';
    const inactiveStyles =
        'text-secondary hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 dark:text-gray-300';

    const getClassName = ({ isActive }) => `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;

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
                        {theme === 'light' ? <LuMoon size={25} /> : <LuSun size={25} />}
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className='p-2 text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-300   transition-all rounded-md hover:text-gray-900 hover:bg-gray-100'
                        title='Мій профіль'>
                        <MdPersonOutline size={25} />
                    </button>
                </div>
            </div>
        </header>
    );
};
