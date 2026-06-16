import React, { useEffect, useRef, useState } from 'react';
import { useCourses } from '@/hooks/useCourse';
import { InputField } from '../inputs/InputField';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { CourseCard } from '../coursecard/CourseCard.jsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Skeleton } from '../ui/Skeleton';
export const CourseList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [difficulty, setDifficulty] = useState();
    const [enrolled, setEnrolled] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: courses, isSuccess, isPending } = useCourses({ search: searchQuery, difficulty, enrolled, page: currentPage });
    const scrollDownRef = useRef(null);
    useEffect(() => {
        scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [courses]);
    return (
        <div className='flex flex-col gap-6 flex-1 pb-6'>
            <h1 className='text-2xl font-bold'>Досліджуй каталог доступних курсів</h1>
            <div className='-mt-3.75 flex gap-2 h-10'>
                <InputField
                    placeholder={'Введіть пошуковий запит'}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    icon={HiMagnifyingGlass}
                    id={'searchbar'}
                />
                <Select onValueChange={value => setDifficulty(value)}>
                    <SelectTrigger className='w-full max-w-48 h-full bg-(--background-surface) py-4'>
                        <SelectValue placeholder='Оберіть складність' />
                    </SelectTrigger>
                    <SelectContent className='dark:bg-(--background-surface) text-primary'>
                        <SelectGroup>
                            <SelectLabel>Складність</SelectLabel>
                            <SelectItem value='Beginner'>Beginer</SelectItem>
                            <SelectItem value='Intermediate'>Intermediate</SelectItem>
                            <SelectItem value='Advanced'>Advenced</SelectItem>
                            <SelectItem value={null}>Будь-яка</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={value => setEnrolled(value)}>
                    <SelectTrigger className='w-full max-w-48 bg-(--background-surface) py-4'>
                        <SelectValue placeholder='Оберіть видимість' />
                    </SelectTrigger>
                    <SelectContent className='dark:bg-(--background-surface) text-primary'>
                        <SelectGroup>
                            <SelectLabel>Видимість</SelectLabel>
                            <SelectItem value={null}>Всі</SelectItem>
                            <SelectItem value={true}>Зареєстрований</SelectItem>
                            <SelectItem value={false}>Доступні</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex max-h-220 h-full'>
                {isPending ? (
                    <Skeleton className='h-100 w-full' />
                ) : (
                    isSuccess &&
                    (courses.courses.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {courses.courses.map(course => (
                                <CourseCard
                                    key={course._id}
                                    courseData={course}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className='font-semibold text-lg'>Список курсів порожній</p>
                    ))
                )}
                <div ref={scrollDownRef} />
            </div>
            {isSuccess && courses.pages > 1 && (
                <Pagination>
                    <PaginationContent>
                        {currentPage != 1 && (
                            <PaginationItem onClick={() => setCurrentPage(prev => prev - 1)}>
                                <PaginationPrevious
                                    className='cursor-pointer'
                                    text='Попередня'
                                />
                            </PaginationItem>
                        )}
                        {Array.from({ length: courses.pages }).map((value, index) => (
                            <PaginationItem onClick={() => setCurrentPage(index + 1)}>
                                <PaginationLink
                                    className='cursor-pointer'
                                    isActive={currentPage === index + 1}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {currentPage !== courses.pages && (
                            <PaginationItem>
                                <PaginationNext
                                    text='Наступна'
                                    className='cursor-pointer'
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};
