import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
export const InputField = React.forwardRef(
    ({ id, label, type = 'text', readOnly = false, isTextArea = false, placeholder, icon: Icon, error, className, ...rest }, ref) => {
        const [visible, setVisible] = useState(false);
        const toggleVisible = () => setVisible(!visible);
        const InputComponent = isTextArea ? 'textarea' : 'input';
        return (
            <div className='flex flex-col w-full gap-1 '>
                {label && (
                    <label
                        htmlFor={id}
                        className='font-medium text-sm'>
                        {label}
                    </label>
                )}
                <div
                    className={`flex flex-row text-sm items-center bg-transparent border rounded-md p-[6px_16px_6px_40px] relative ${!Icon && 'pl-3'}`}>
                    {Icon && (
                        <Icon
                            className='absolute -translate-y-1/2 left-2 top-1/2'
                            size={20}
                            opacity={0.7}
                        />
                    )}
                    <InputComponent
                        id={id}
                        ref={ref}
                        readOnly={readOnly}
                        {...(isTextArea ? {} : { type: type === 'password' ? (visible ? 'text' : 'password') : type })}
                        className={cn(
                            'flex-1 placeholder-gray-400 bg-transparent border-none outline-none w-full resize-none wrap-break-word',
                            className,
                        )}
                        placeholder={placeholder}
                        {...rest}
                    />
                    {type == 'password' && (
                        <button
                            type='button'
                            onClick={toggleVisible}
                            aria-label={visible ? 'Сховати пароль' : 'Показати пароль'}>
                            {visible ? (
                                <IoMdEye
                                    size={20}
                                    opacity={0.7}
                                />
                            ) : (
                                <IoMdEyeOff
                                    size={20}
                                    opacity={0.7}
                                />
                            )}
                        </button>
                    )}
                </div>
                {error && <p className='-mb-3 text-sm font-medium text-red-500'>{error}</p>}
            </div>
        );
    },
);
