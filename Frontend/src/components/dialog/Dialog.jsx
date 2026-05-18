import React from 'react';
import { cn } from '@/lib/utils';
import { IoIosClose } from 'react-icons/io';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
export const Dialog = ({ children, visible = false, headerTitle, onClose, sumbitTitle, onSubmit, isPending = false }) => {
    return (
        <form
            className={cn('fixed inset-0 bg-black/50 hidden items-center justify-center p-4 z-50', visible && 'flex')}
            onSubmit={onSubmit}>
            <div
                className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-3/4 
             '>
                <header className='flex justify-between border-b p-4 px-6 items-center w-full flex-1'>
                    <h2 className='text-lg font-bold text-gray-900'>{headerTitle}</h2>
                    <button
                        type='button'
                        onClick={onClose}
                        className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
                        <IoIosClose className='w-6 h-6' />
                    </button>
                </header>
                <main className='py-4 px-6 gap-4 flex flex-col overflow-y-auto h-96'>{children}</main>
                <footer className='flex justify-between gap-6 px-6 py-3 flex-1'>
                    <Button
                        variant='secondary'
                        size='lg'
                        className='flex-1 rounded-xl p-4 text-base'
                        onClick={onClose}
                        type='button'>
                        <p>Скасувати</p>
                    </Button>
                    <Button
                        size='lg'
                        type='submit'
                        className='bg-cta hover:bg-blue-900 flex-1 rounded-xl p-4 text-base'>
                        {isPending ? <Spinner className='h-5 w-5' /> : <p>{sumbitTitle}</p>}
                    </Button>
                </footer>
            </div>
        </form>
    );
};
