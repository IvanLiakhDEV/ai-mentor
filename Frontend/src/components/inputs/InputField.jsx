import React, { useState } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
export const InputField = React.forwardRef(({ id, label, type = 'text', placeholder, icon: Icon, error, ...rest }, ref) => {
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
                className={`flex flex-row items-center bg-transparent border rounded-md p-[12px_16px_12px_40px] relative ${!Icon && 'pl-3'}`}>
                {Icon && (
                    <Icon
                        className='absolute -translate-y-1/2 left-2 top-1/2'
                        size={20}
                        opacity={0.7}
                    />
                )}
                <input
                    id={id}
                    ref={ref}
                    type={type == 'password' ? (visible ? 'text' : 'password') : type}
                    className='flex-1 placeholder-gray-400 bg-transparent border-none outline-none'
                    placeholder={placeholder}
                    {...rest}
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
            {error && <p className='-mb-3 text-sm font-medium text-red-500'>{error}</p>}
        </div>
    );
});
