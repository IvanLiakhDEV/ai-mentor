import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { MdPersonOutline } from 'react-icons/md';

export const Header = () => {
    const navigate = useNavigate();

    const baseStyles = 'py-2 px-3 transition-colors duration-200 rounded-md ';
    const activeStyles = 'bg-cta font-semibold text-white';
    const inactiveStyles = 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';

    const getClassName = ({ isActive }) => `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;

    return (
        <header className='w-full border-b border-gray-100 bg-bg-surface'>
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

                <div>
                    <button
                        onClick={() => navigate('/profile')}
                        className='p-2 text-gray-600 transition-all rounded-md hover:text-gray-900 hover:bg-gray-100'
                        title='Мій профіль'>
                        <MdPersonOutline size={25} />
                    </button>
                </div>
            </div>
        </header>
    );
};
