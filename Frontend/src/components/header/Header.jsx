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
        <header className='flex items-center justify-between px-6 py-2 bg-bg-surface'>
            <div className='flex'>
                <div className='mr-10 font-bold'>Logo</div>
                <nav>
                    <ul className='flex gap-6 list-none'>
                        <li>
                            <NavLink
                                to='/'
                                className={getClassName}>
                                Catalog
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                to='/leaderboard'
                                className={getClassName}>
                                Leaderboard
                            </NavLink>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div>
                <nav>
                    <ul>
                        <li>
                            <button className='p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100'>
                                <MdPersonOutline
                                    size={25}
                                    onClick={() => navigate('/profile')}
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
