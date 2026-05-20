import { IoMdClose } from 'react-icons/io';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export const AchevementToast = ({ achievement, t }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (achievement?.xpReward === 0) return;
        let startTimestamp = null;
        const step = timestamp => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
            setCount(Math.floor(progress * achievement?.xpReward));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [achievement?.xpReward]);
    useEffect(() => {
        if (achievement?.xpReward > 0 && count === achievement?.xpReward) {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.4 },
                zIndex: 9999,
            });
        }
    }, [count, achievement?.xpReward]);
    return (
        <div className='flex flex-col w-96 bg-(--background-primary) rounded-2xl overflow-hidden'>
            <header className='flex justify-between p-4 bg-slate-400 relative '>
                <div className='absolute inset-0 opacity-20'>
                    <div className='absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16'></div>
                    <div className='absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16'></div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='rounded-full p-3 bg-slate-50'>
                        <img
                            src={achievement?.iconUrl}
                            alt='achievement icon'
                            width={45}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-medium text-base text-secondary'>НОВЕ ДОСЯГНЕННЯ!</h1>
                        <span className='font-bold text-lg '>{achievement?.title || 'Досягнення'}</span>
                    </div>
                </div>
                <button
                    onClick={() => toast.dismiss(t)}
                    className='absolute top-2 right-2 text-white/60 hover:text-white transition-colors z-10 p-1'>
                    <IoMdClose className='w-5 h-5' />
                </button>
            </header>
            <footer className='flex flex-col items-center justify-center p-4'>
                <span className='text-base font-medium text-secondary'>{achievement?.description || 'Пройти перший урок'}</span>
                <span className='font-semibold text-cta'>{`+${count} Очок`}</span>
            </footer>
        </div>
    );
};
