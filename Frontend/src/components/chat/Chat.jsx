import React, { useEffect, useRef, useState } from 'react';
import { LuSparkles, LuSend } from 'react-icons/lu';
import { InputField } from '../inputs/InputField';
import { Message } from '../message/Message';
import { useSendMessage } from '@/hooks/useChat';
import { TypingIndicator } from '../message/TypingIndicator';

export const Chat = ({ lesson, code }) => {
    const { mutate: sendMessage, isPending } = useSendMessage();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            message:
                'Привіт! Я твій AI-асистент для навчання. Можу допомогти розібратися з концепціями, знайти помилки в коді або відповісти на запитання про урок. Як я можу тобі допомогти?',
            isBot: true,
        },
    ]);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isPending]);
    const onSubmit = e => {
        e.preventDefault();
        if (!message.trim() || isPending) return;
        const newMessages = [...messages, { message, isBot: false }];
        setMessages(newMessages);
        setMessage('');

        sendMessage(
            { messages: newMessages, lesson: lesson.data.lesson, code },
            {
                onSuccess: response => {
                    setMessages(prev => [
                        ...prev,
                        {
                            message: response.data,
                            isBot: true,
                        },
                    ]);
                },
                onError: error => {
                    setMessages(prev => [
                        ...prev,
                        {
                            message: error.response?.data?.message || 'Щось пішло не так. Спробуй ще раз.',
                            isBot: true,
                            isError: true,
                        },
                    ]);
                },
            },
        );
    };
    return (
        <form
            onSubmit={onSubmit}
            className='flex flex-col h-screen'>
            <header className='bg-slate-700'>
                <div className='items-center flex gap-3 px-5 py-2 '>
                    <LuSparkles className='h-6 w-6 text-blue-200 ' />
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-lg text-slate-100 dark:text-secondary leading-6'>Застряг?</h1>
                        <span className='font-medium text-slate-300 dark:text-secondary'>Запитай ментора</span>
                    </div>
                </div>
            </header>
            <main className='flex-1  h-full overflow-auto'>
                <div className='p-5 flex flex-col gap-2'>
                    {messages?.map((message, index) => (
                        <Message
                            key={index}
                            message={message.message}
                            isBot={message.isBot}
                        />
                    ))}
                    {isPending && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
            </main>
            <footer className='flex p-3 border-t items-center gap-1'>
                <InputField
                    placeholder='Поставте питання ментору'
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    readOnly={isPending}
                    maxLength={200}
                />
                <button className='rounded-full p-2'>
                    <LuSend className='w-8 h-8' />
                </button>
            </footer>
        </form>
    );
};
