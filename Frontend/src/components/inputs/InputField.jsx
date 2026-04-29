import React, { useState } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
export const InputField = ({ id, label, type = 'text', placeholder, showPrefixIcon = true, icon: Icon }) => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => setVisible(!visible);
    return (
        <div className='flex flex-col w-full gap-1'>
            {label && (
                <label
                    htmlFor={id}
                    className='font-medium'>
                    {label}
                </label>
            )}

            <div
                className={`flex flex-row items-center bg-transparent border rounded-md p-[12px_16px_12px_40px] relative ${!showPrefixIcon && 'pl-3'}`}>
                {showPrefixIcon && (
                    <Icon
                        className='absolute left-2 top-50'
                        size={20}
                        opacity={0.7}
                    />
                )}
                <input
                    id={id}
                    type={type == 'password' ? (visible ? 'text' : 'password') : type}
                    className='flex-1 placeholder-gray-400 bg-transparent border-none outline-none'
                    placeholder={placeholder}
                />
                {type == 'password' &&
                    (visible ? (
                        <IoMdEye
                            size={20}
                            onClick={toggleVisible}
                        />
                    ) : (
                        <IoMdEyeOff
                            size={20}
                            onClick={toggleVisible}
                        />
                    ))}
            </div>
        </div>
    );
};
