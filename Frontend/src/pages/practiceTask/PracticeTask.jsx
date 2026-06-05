import { Box } from '@/components/box/Box';
import { Chat } from '@/components/chat/Chat';
import { TaskCompleted } from '@/components/taskCompletition/TaskCompleted';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/Resizable';
import { Skeleton } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';
import { useFetchTask, useSubmitCode } from '@/hooks/usePractice';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaPlay } from 'react-icons/fa6';
import { LuBookOpen, LuTerminal } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router';

export const PracticeTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const { data: taskData, isPending: isLoadingTask } = useFetchTask(id);
    const { mutate: submitCode, isPending: isSubmitting, data } = useSubmitCode();
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    useEffect(() => {
        if (taskData) setCode(taskData.userCode || taskData.initialCode);
    }, [taskData]);

    const onSubmit = () => {
        submitCode(
            { id, code },
            {
                onSuccess: res => {
                    if (res.isCorrect) {
                        setShowCompletionModal(true);
                        setIsCompleted(true);
                        setAttempts(res.attempts);
                    }
                },
            },
        );
    };

    if (isLoadingTask)
        return (
            <div className='flex justify-between gap-4'>
                <div className='h-screen w-full flex-1'>
                    <Skeleton className='h-screen bg-slate-200 dark:bg-slate-800 flex justify-center p-4 flex-col gap-20'>
                        <Skeleton className='w-full h-48 dark:bg-slate-600' />
                        <Skeleton className='w-full h-48 dark:bg-slate-600' />
                        <Skeleton className='w-full h-48 dark:bg-slate-600' />
                    </Skeleton>
                </div>
                <div className='h-screen w-full flex-1'>
                    <Skeleton className='h-screen bg-slate-200 dark:bg-slate-800 flex justify-center p-4 flex-col gap-10'>
                        <Skeleton className='w-full h-full dark:bg-slate-600' />
                        <Skeleton className='w-full h-full dark:bg-slate-600' />
                    </Skeleton>
                </div>
                <div className='h-screen w-full flex-1'>
                    <Skeleton className='h-screen bg-slate-200 dark:bg-slate-800 flex justify-center p-4 flex-col gap-20'>
                        <Skeleton className='w-full h-full dark:bg-slate-600' />
                    </Skeleton>
                </div>
            </div>
        );
    return (
        <div className='flex flex-col h-screen'>
            {showCompletionModal && (
                <TaskCompleted
                    task={taskData}
                    attempts={attempts}
                />
            )}
            <ResizablePanelGroup
                orientation='horizontal'
                className='grid grid-cols-3 flex-1 min-h-0'>
                <ResizablePanel
                    defaultSize='30%'
                    minSize='20%'
                    maxSize='45%'>
                    <div className='flex flex-col p-3 overflow-y-auto border-r gap-4'>
                        <button
                            className='flex gap-2 dark:text-primary text-secondary items-center font-medium cursor-pointer bg-bg-primary  '
                            onClick={() => navigate(-1)}>
                            <FaArrowLeft />
                            Повернутися назад
                        </button>
                        <Box className='bg-slate-700 rounded-md'>
                            <h1 className='text-xl font-semibold  text-white'>{taskData.topic}</h1>
                        </Box>
                        <Box className='h-full'>
                            <div className='flex items-center gap-2 mb-4'>
                                <LuBookOpen className='w-5 h-5 text-secondary' />
                                <p className='text-lg font-semibold text-primary'>Завдання</p>
                            </div>
                            <div
                                className='prose max-w-none'
                                dangerouslySetInnerHTML={{ __html: taskData.taskDescription }}
                            />
                        </Box>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize='42%'
                    minSize='30%'
                    maxSize='40%'>
                    <ResizablePanelGroup
                        orientation='vertical'
                        className='h-full w-full flex flex-col min-h-0'>
                        <ResizablePanel
                            defaultSize={70}
                            minSize={40}
                            className='flex flex-col min-h-0'>
                            <div className='bg-neutral-900 p-2 flex border-b border-gray-700 justify-end gap-2 shrink-0'>
                                <button
                                    className='px-4 py-1.5 text-sm bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all font-medium flex items-center justify-center cursor-pointer disabled:opacity-50'
                                    onClick={() => onSubmit()}
                                    disabled={isSubmitting || isCompleted}>
                                    {isSubmitting ? (
                                        <Spinner />
                                    ) : (
                                        <div className='flex items-center gap-2'>
                                            <FaPlay className='text-xs' />
                                            Запустити код
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div className='flex-1 h-full min-h-0 w-full bg-neutral-900'>
                                <Editor
                                    height='100%'
                                    width='100%'
                                    defaultLanguage={taskData?.language || 'javascript'}
                                    theme='vs-dark'
                                    value={code}
                                    onChange={newValue => setCode(newValue ?? '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel
                            defaultSize={30}
                            minSize={15}
                            className='flex flex-col min-h-0 bg-bg-primary'>
                            <h2 className='text-primary font-medium px-4 bg-bg-primary py-3 border-b shrink-0 select-none'>
                                Результат виконання коду
                            </h2>

                            <div className='flex-1 overflow-y-auto p-4  min-h-0 flex'>
                                <p className='text-slate-300 font-mono text-sm break-all whitespace-pre-wrap flex-1 m-0'>
                                    {data?.output ? (
                                        <span className={data?.isCorrect ? 'text-green-400' : 'text-red-400'}>{data.output}</span>
                                    ) : (
                                        <span className='flex items-center text-sm gap-2 text-slate-500'>
                                            <LuTerminal className='h-5 w-5 shrink-0' />
                                            Натисніть "Запустити код", щоб побачити результат виконання
                                        </span>
                                    )}
                                </p>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize='28%'
                    minSize='15%'
                    maxSize='40%'>
                    <Chat
                        data={taskData}
                        code={code}
                        type={'practiceTask'}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
            </ResizablePanelGroup>
        </div>
    );
};
