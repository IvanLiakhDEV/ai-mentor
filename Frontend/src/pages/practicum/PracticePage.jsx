import { Box } from '@/components/box/Box';
import React from 'react';
import { LuSparkles, LuStar } from 'react-icons/lu';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { Button } from '@/components/ui/Button';
import { PracticeTaskCard } from '@/components/practiceTaskCard/PracticeTaskCard';
import { useCreateTask, useFetchMyTasks } from '@/hooks/usePractice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskValidationSchema } from '@/formValidation/practiceTaskSchema';
import { toast } from 'sonner';
import { LANGUAGES } from '@/formValidation/courseSchema';
import { Difficulty } from '@/components/difficulty/Difficulty';
import { Spinner } from '@/components/ui/Spinner';
import { Skeleton } from '@/components/ui/Skeleton';
import { PRACTICE_TOPICS } from '@/assets/style/constants/Constants';

export const PracticePage = () => {
    const { data: myTasks, isPending } = useFetchMyTasks();
    const { mutate: createTask, isPending: isCreatingTask } = useCreateTask();

    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            topic: '',
            difficulty: 'easy',
            language: '',
        },
        resolver: zodResolver(taskValidationSchema),
    });

    const difficulty = watch('difficulty');

    const onCreateTask = data => {
        console.log(data);
        createTask(data, {
            onSuccess: () => {
                toast.success('Завдання успішно згенеровано!');
            },
        });
    };

    const onDifficultyChange = value => {
        setValue('difficulty', value, { shouldValidate: true });
    };

    const sortedTasks = myTasks
        ? [...myTasks]?.sort((a, b) => {
              if (a.isCompleted !== b.isCompleted) {
                  return a.isCompleted ? 1 : -1;
              }
              return new Date(b.createdAt) - new Date(a.createdAt);
          })
        : [];

    return (
        <div className='flex flex-col mx-auto'>
            <section className='w-full bg-cta'>
                <div className='grid gap-10 px-6 py-16 mx-auto text-white max-w-7xl '>
                    <h1 className='text-5xl font-semibold '>Додаткові завдання</h1>
                    <h2 className='text-xl'>
                        AI асистент генерує унікальні завдання під ваш рівень і тему. Оберіть параметри та отримайте персональний виклик.
                    </h2>
                </div>
            </section>
            <div className='flex w-full px-6 mx-auto mt-6 items-center justify-center flex-col gap-4 max-w-3xl py-3'>
                <Box className='p-0 overflow-hidden w-full'>
                    <form onSubmit={handleSubmit(onCreateTask)}>
                        <header className='flex items-center gap-4 border-b p-6 py-4 bg-(--background-primary)'>
                            <LuSparkles className='h-7 w-7 text-blue-600' />
                            <div className=''>
                                <h2 className='font-semibold text-lg'>ШІ-асистент</h2>
                                <p className='text-secondary'>Виберіть тему та складність для генерації завдань</p>
                            </div>
                        </header>
                        <main className='p-6 space-y-4'>
                            <div className='grid gap-2'>
                                <p className='text-secondary font-semibold'>Тема</p>
                                <Combobox items={PRACTICE_TOPICS}>
                                    <ComboboxInput
                                        {...register('topic')}
                                        placeholder='Введіть тему або виберіть зі списку'
                                        className='py-4 bg-transparent'
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {item => (
                                                <ComboboxItem
                                                    key={item}
                                                    value={item}>
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            <div className='grid gap-2'>
                                <p className='text-secondary font-semibold'>Мова програмування</p>
                                <Combobox items={LANGUAGES}>
                                    <ComboboxInput
                                        {...register('language')}
                                        placeholder='Введіть тему або виберіть зі списку'
                                        className='py-4 bg-transparent'
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {item => (
                                                <ComboboxItem
                                                    key={item}
                                                    value={item}>
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            <div className='grid gap-2'>
                                <p className='text-secondary font-semibold'>Складність</p>
                                <div className='grid grid-cols-3 gap-2'>
                                    <Difficulty
                                        difficultyTitle='Легко'
                                        difficultyValue='easy'
                                        onDifficultyChange={onDifficultyChange}
                                        isActive={difficulty === 'easy'}
                                    />
                                    <Difficulty
                                        difficultyTitle='Середньо'
                                        difficultyValue='medium'
                                        onDifficultyChange={onDifficultyChange}
                                        isActive={difficulty === 'medium'}
                                    />
                                    <Difficulty
                                        difficultyTitle='Важко'
                                        difficultyValue='hard'
                                        onDifficultyChange={onDifficultyChange}
                                        isActive={difficulty === 'hard'}
                                    />
                                </div>
                            </div>
                        </main>
                        <footer className='p-6 pt-0'>
                            <Button
                                className='w-full bg-cta py-6 text-sm hover:bg-blue-800'
                                disabled={isCreatingTask}>
                                {isCreatingTask ? (
                                    <div className='flex items-center gap-2'>
                                        <Spinner className='h-5 w-5' />
                                        <p>Генерація завдання</p>
                                    </div>
                                ) : (
                                    'Згенерувати завдання'
                                )}
                            </Button>
                        </footer>
                    </form>
                </Box>
                <div className='flex flex-col gap-2  w-full'>
                    <div className='flex justify-between'>
                        <span className='font-semibold'>Згенеровані завдання</span>
                        <span className='text-sm '>{myTasks?.length || 0} завдань</span>
                    </div>
                    {isPending ? (
                        <Skeleton className='w-full h-50' />
                    ) : (
                        sortedTasks &&
                        sortedTasks.map(task => (
                            <PracticeTaskCard
                                key={task._id}
                                difficulty={task.difficulty}
                                title={task.topic}
                                description={task.shortDescription}
                                points={task.points}
                                id={task._id}
                                isCompleted={task.isCompleted}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
