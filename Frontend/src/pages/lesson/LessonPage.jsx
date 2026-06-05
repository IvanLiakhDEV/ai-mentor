import React, { useRef, useState } from 'react';
import { useGetLesson } from '@/hooks/useLesson';
import { useNavigate, useParams } from 'react-router';
import Editor from '@monaco-editor/react';
import { Box } from '@/components/box/Box';
import { Chat } from '@/components/chat/Chat';
import { LuBookOpen, LuTerminal } from 'react-icons/lu';
import { FaArrowLeft, FaPlay } from 'react-icons/fa6';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useSubmitCode } from '@/hooks/useCode';
import { Spinner } from '@/components/ui/Spinner';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/Resizable';
import { Skeleton } from '@/components/ui/Skeleton';
import { AchevementToast } from '@/components/popup/AchievementToaster';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { CourseCompletitionDialog } from '@/components/course/CourseCompletitionDialog';
export const LessonPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: lesson, isLoading, isError, error } = useGetLesson(id);
    if (isLoading)
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
    if (isError && (error?.message?.includes('403') || error?.message?.includes('404'))) {
        navigate('/');
        return null;
    }
    return (
        <Lesson
            key={lesson?.data?.lesson._id}
            lesson={lesson}
        />
    );
};

const Lesson = ({ lesson }) => {
    const navigate = useNavigate();
    const [code, setCode] = useState(lesson.data.lesson.practice.initialCode ?? '');
    const [isCompleted, setIsCompleted] = useState(false);
    const [nextLesson, setNextLesson] = useState(null);
    const editorRef = useRef(null);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const { mutate: handleSubmit, isPending, data: submitedData } = useSubmitCode();

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
        editor.focus();
    }

    const submitCode = () => {
        handleSubmit(
            { code, id: lesson.data.lesson._id },
            {
                onSuccess: response => {
                    if (response.isCorrect) setIsCompleted(true);
                    if (response.unlockedAchievements.length > 0)
                        response.unlockedAchievements.map(value =>
                            toast.custom(
                                t => (
                                    <AchevementToast
                                        t={t}
                                        achievement={value}
                                    />
                                ),
                                { duration: 10000 },
                            ),
                        );
                    if (response.nextLesson) {
                        setNextLesson(response.nextLesson);
                    }
                },
            },
        );
    };

    const goToNextLesson = () => {
        if (!nextLesson && isCompleted) {
            setShowCompletionModal(true);
            return;
        }
        navigate(`/lesson/${nextLesson._id}`, { replace: true });
    };

    return (
        <div className='flex h-screen overflow-hidden'>
            {showCompletionModal && (
                <CourseCompletitionDialog
                    course={lesson.data.course}
                    points={lesson.data.enrollment.points}
                    numberOfLessons={lesson.data.enrollment.completedSequence}
                />
            )}

            <ResizablePanelGroup orientation='horizontal'>
                <ResizablePanel
                    defaultSize='30%'
                    minSize='20%'
                    maxSize='45%'>
                    <div className='flex flex-col h-full flex-1  overflow-auto'>
                        <button
                            className='flex gap-2 dark:text-primary text-secondary items-center font-medium cursor-pointer bg-bg-primary p-4 border'
                            onClick={() => navigate('/')}>
                            <FaArrowLeft />
                            Повернутися до курсів
                        </button>
                        <div className='flex flex-col gap-6 p-3 overflow-y-auto '>
                            <Box className='bg-slate-700 rounded-md'>
                                <h1 className='text-xl font-semibold  text-white'>{lesson.data.lesson.title}</h1>
                            </Box>
                            <Box>
                                <div className='flex items-center gap-2 mb-4'>
                                    <LuBookOpen className='w-5 h-5 text-secondary' />
                                    <p className='text-lg font-semibold text-primary'>Теорія</p>
                                </div>
                                <div
                                    className='prose max-w-none'
                                    dangerouslySetInnerHTML={{ __html: lesson.data.lesson.theory.content }}
                                />
                            </Box>
                            <Box>
                                <div className='flex items-center gap-2 mb-4'>
                                    <IoMdCheckmarkCircleOutline className='w-5 h-5 text-secondary' />
                                    <p className='text-lg font-semibold text-primary'>Практика</p>
                                </div>
                                <div
                                    className='prose max-w-none'
                                    dangerouslySetInnerHTML={{ __html: lesson.data.lesson.practice.taskDescription }}
                                />
                            </Box>
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize='42%'
                    minSize='30%'
                    className='bg-black'>
                    <div className='flex flex-1 flex-col  h-full overflow-hidden'>
                        <div className='flex-1 flex flex-col'>
                            <div className='bg-neutral-900 p-2 flex border-b border-gray-700 justify-end gap-2'>
                                {isCompleted && (
                                    <button
                                        className='px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium '
                                        onClick={goToNextLesson}>
                                        <div className='flex items-center gap-2'>
                                            <FaPlay />
                                            {!nextLesson ? 'Завершити курс' : 'Перейди до наступного уроку'}
                                        </div>
                                    </button>
                                )}

                                <button
                                    className='px-4 py-1.5 text-sm bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all font-medium '
                                    onClick={submitCode}>
                                    {isPending ? (
                                        <Spinner />
                                    ) : (
                                        <div className='flex items-center gap-2'>
                                            <FaPlay />
                                            Запустити код
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div className='flex-1 h-full min-h-0'>
                                <Editor
                                    height='100%'
                                    defaultLanguage={lesson.data.lesson.language}
                                    defaultValue={lesson.data.lesson.practice.initialCode ?? ''}
                                    onMount={handleEditorDidMount}
                                    theme='vs-dark'
                                    value={code}
                                    options={{
                                        minimap: {
                                            enabled: false,
                                        },
                                    }}
                                    onChange={value => setCode(value)}
                                />
                            </div>
                        </div>
                        <div className='flex-1 shrink-0'>
                            <h2 className='text-primary font-medium bg px-4 bg-bg-primary py-3 border-b-2'> Результат виконання коду</h2>
                            <div className='h-full bg-bg-primary flex p-2'>
                                <p className='text-slate-600 font-mono text-sm break-all whitespace-pre-wrap '>
                                    {submitedData ? (
                                        <span className={submitedData?.isCorrect ? 'text-green-400' : 'text-red-400'}>
                                            {submitedData?.output}
                                        </span>
                                    ) : (
                                        <span className='flex items-center text-sm gap-2 text-slate-500'>
                                            <LuTerminal className='h-5 w-5 shrink-0' />
                                            Натисніть "Запустити код", щоб побачити результат виконання
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize='28%'
                    minSize='15%'
                    maxSize='40%'>
                    <div className='flex-1'>
                        <Chat
                            data={lesson?.data?.lesson}
                            code={code}
                            type={'lesson'}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
            <Toaster
                position='top-center'
                toastOptions={{
                    className: 'bg-transparent border-0 shadow-none p-0',
                }}
            />
        </div>
    );
};
