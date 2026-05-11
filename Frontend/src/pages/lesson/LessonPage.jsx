import React, { useRef, useState } from 'react';
import { useGetLesson } from '@/hooks/useLesson';
import { useNavigate, useParams } from 'react-router';
import Editor from '@monaco-editor/react';
import { Box } from '@/components/box/Box';
import { Chat } from '@/components/chat/Chat';
import { LuBookOpen } from 'react-icons/lu';
import { FaArrowLeft, FaPlay } from 'react-icons/fa6';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useSubmitCode } from '@/hooks/useCode';
import { Spinner } from '@/components/ui/Spinner';
export const LessonPage = () => {
    const { id } = useParams();
    const { data: lesson, isLoading } = useGetLesson(id);
    const [code, setCode] = useState('');
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const { mutate: handleSubmit, isPending, data: submitedData } = useSubmitCode();

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
        editor.focus();
    }

    const submitCode = () => {
        handleSubmit({ code, id: lesson.data._id });
    };

    if (isLoading) return <p>Loading</p>;

    return (
        <div className='flex'>
            <div className='flex flex-col h-full flex-1 border-r-6 border-gray-200 resize-x overflow-auto'>
                <button
                    className='flex gap-2 text-secondary items-center font-medium cursor-pointer bg-white p-4 border'
                    onClick={() => navigate('/')}>
                    <FaArrowLeft />
                    Повернутися до курсів
                </button>
                <div className='flex flex-col gap-6 p-3 overflow-y-auto '>
                    <Box className='bg-slate-700 rounded-md'>
                        <h1 className='text-xl font-semibold  text-white'>{lesson.data.title}</h1>
                    </Box>
                    <Box>
                        <div className='flex items-center gap-2 mb-4'>
                            <LuBookOpen className='w-5 h-5 text-slate-600' />
                            <p className='text-lg font-semibold text-gray-900'>Теорія</p>
                        </div>
                        <p>{lesson.data.theory.content}</p>
                    </Box>
                    <Box>
                        <div className='flex items-center gap-2 mb-4'>
                            <IoMdCheckmarkCircleOutline className='w-5 h-5 text-slate-600' />
                            <p className='text-lg font-semibold text-gray-900'>Практика</p>
                        </div>
                        <p>{lesson.data.practice.taskDescription}</p>
                    </Box>
                </div>
            </div>
            <div className='flex flex-1 flex-col border-r-6 border-gray-200'>
                <div className='flex-1 flex flex-col'>
                    <div className='bg-neutral-900 p-2 flex border-b border-gray-700'>
                        <button
                            className='px-4 py-1.5 text-sm bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all font-medium ml-auto'
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
                    <div className='h-full resize overflow-auto min-w-1/3'>
                        <Editor
                            defaultLanguage='javascript'
                            defaultValue={lesson.data.practice.initialCode ?? ''}
                            onMount={handleEditorDidMount}
                            theme='vs-dark'
                            className='min-w-1/3'
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
                <div className='flex-1'>
                    <h2 className='text-gray-600 font-semibold bg px-4 bg-white py-3 border-b-2'>Результат виконання коду</h2>
                    <div className='bg-neutral-900 h-full p-2 overflow-hidden'>
                        <p className='text-slate-200 font-mono text-sm break-all whitespace-pre-wrap'>
                            {(submitedData?.data?.stdout || submitedData?.data?.stderr) ??
                                'Натисніть "Запустити код", щоб побачити результат виконання'}
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <Chat />
            </div>
        </div>
    );
};
