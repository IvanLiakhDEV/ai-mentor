import React from 'react';
import { useCourseById } from '@/hooks/useCourse';
import { useNavigate, useParams } from 'react-router';
import { Skeleton } from '@/components/ui/Skeleton';
import { FaArrowLeft } from 'react-icons/fa6';
import { RxPeople } from 'react-icons/rx';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { LuBookOpen } from 'react-icons/lu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Box } from '@/components/box/Box';
import { Button } from '@/components/button/Button';
import { useRegisterToCourse } from '@/hooks/useEnrollment';
import { Progress } from '@/components/ui/Progress';
import { LuPlay } from 'react-icons/lu';
import { useGetNextLesson } from '@/hooks/useLesson';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/Spinner';
export const CoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: course, isLoading: isLoadingCourse } = useCourseById(id);
    const { mutate: handleRegister } = useRegisterToCourse();
    const { mutate: fetchNextLesson, isPending: isLoadingNextLesson } = useGetNextLesson();

    const onClick = ({ courseId }) => {
        if (course?.data?.isEnrolled) {
            fetchNextLesson(
                { courseId },
                {
                    onSuccess: data => {
                        navigate(`/lesson/${data.data._id}`);
                    },
                    onError: error => {
                        toast.error(error.response?.data?.message || 'При збереженні змін виникла помилка');
                    },
                },
            );
        } else if (course?.data?._id) {
            handleRegister(course.data._id);
        }
    };
    if (isLoadingCourse)
        return (
            <div className='max-w-7xl mx-auto pt-14 flex flex-col w-full'>
                <Skeleton className='bg-gray-200 h-60 ' />
                <div className='flex pt-6 w-full h-full gap-6 justify-between'>
                    <Skeleton className='h-60 w-full pr-100 bg-gray-200' />
                    <Skeleton className='h-20 w-full bg-gray-200' />
                </div>
            </div>
        );
    const completedSequence = course?.data?.enrollment?.completedSequence || 0;

    const isCompleted = lesson => {
        return lesson?.sequenceNumber <= completedSequence;
    };
    const getModuleCompletedCount = module => {
        return module.lessons.filter(isCompleted).length;
    };
    return (
        <div className='pt-14 mx-auto max-w-7xl px-6'>
            <div className='flex flex-col gap-7 '>
                <button
                    className='flex gap-2 text-secondary items-center font-medium cursor-pointer max-w-fit'
                    onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                    Повернутися до курсів
                </button>
                <div className='bg-gradient-to-r from-[#5b4ccc] to-[#7c6fd6] rounded-lg p-8 mb-8 text-white'>
                    <div className='grid gap-7'>
                        <h1 className='text-4xl font-bold'>{course.data.title}</h1>
                        <h2 className='text-xl'>{course.data.description}</h2>
                        <div className='grid gap-2'>
                            <div className='flex justify-between'>
                                <p>Кількість пройдених уроків: {course.data?.enrollment?.completedSequence || 0}</p>
                                <p>
                                    Кількість уроків, що залишилася:&nbsp;
                                    {course.data.numberOfLessons - (course.data?.enrollment?.completedSequence || 0)}
                                </p>
                            </div>
                            <Progress
                                value={((course.data?.enrollment?.completedSequence || 0) / course.data.numberOfLessons) * 100}
                                className='bg-blue-100 rounded-full h-2'
                            />
                        </div>
                    </div>
                    <div className='flex gap-4 mt-6'>
                        <div className='flex gap-2 items-center'>
                            <RxPeople className='w-5 h-5' />
                            <p>{course.data.numOfParticipants} приєдналося</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <LuBookOpen className='w-5 h-5' />
                            <p>{course.data.numberOfLessons} урок</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-6 flex-col md:flex-row'>
                    <Box className='flex-1 flex flex-col gap-2'>
                        <p className='font-bold text-xl mb-5'>Зміст курсу</p>
                        {course.data.modules.map(module => {
                            const completedInModule = getModuleCompletedCount(module);
                            return (
                                <Accordion
                                    type='multiple'
                                    className='border rounded-lg overflow-hidden border-border'
                                    defaultValue={[module.title]}>
                                    <AccordionItem
                                        key={module.title}
                                        value={module.title}>
                                        <AccordionTrigger className='px-6 py-4 border-b dark:bg-gray-700 border-border flex justify-between'>
                                            <p className='text-lg font-bold text-primary flex-1'>{module.title}</p>
                                            <p className='text-sm font-bold text-secondary'>{`${completedInModule}/${module.lessons.length} виконано`}</p>
                                        </AccordionTrigger>
                                        {module.lessons.map(lesson => (
                                            <AccordionContent className='px-6 py-4 flex items-center justify-between w-full  transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer mb-0'>
                                                <p
                                                    className={`font-medium text-primary text-[1rem] ${isCompleted(lesson) && 'line-through'} `}>
                                                    {lesson.title}
                                                </p>
                                                {isCompleted(lesson) && (
                                                    <div>
                                                        <IoMdCheckmarkCircleOutline
                                                            className='w-6 h-6 text-green-500'
                                                            aria-label={`Урок ${lesson.title} виконано`}
                                                        />
                                                    </div>
                                                )}
                                            </AccordionContent>
                                        ))}
                                    </AccordionItem>
                                </Accordion>
                            );
                        })}
                    </Box>
                    <Box className='max-h-min flex flex-col gap-4 max-w-88 w-full'>
                        <Button
                            prefixIcon={course?.data?.enrollment?.status === 'Completed' ? null : LuPlay}
                            title={
                                isLoadingNextLesson ? (
                                    <Spinner className='h-5 w-5' />
                                ) : course?.data?.isEnrolled ? (
                                    course?.data?.enrollment?.status === 'Completed' ? (
                                        'Курс пройдено'
                                    ) : (
                                        'Продовжити навчання'
                                    )
                                ) : (
                                    'Зареєструватися на курс'
                                )
                            }
                            onClick={() => onClick({ courseId: course?.data?._id })}
                            className='mx-auto border-b w-full'
                        />

                        {course?.data?.enrollment && (
                            <div>
                                <h1 className='font-semibold mb-2 text-primary text-lg'>Ваш прогрес</h1>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between mt-3 text-sm'>
                                        <span className='text-secondary'>Очок здобуто</span>
                                        <span className='font-semibold'>{course?.data?.enrollment?.points}</span>
                                    </div>
                                    <div className='flex justify-between mt-3 text-sm'>
                                        <span className='text-secondary'>Уроків пройдено</span>
                                        <span className='font-semibold'>{course?.data?.enrollment?.completedSequence}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Box>
                </div>
            </div>
        </div>
    );
};
