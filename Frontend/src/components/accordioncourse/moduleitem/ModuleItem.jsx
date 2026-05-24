import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '../../ui/Accordion';
import { LuLayers, LuPencil, LuTrash2 } from 'react-icons/lu';
import { Button } from '../../ui/Button';
import { FaPlus } from 'react-icons/fa6';
import { SortableList } from '../../sortable/SortableList';
import { useReorderLessons } from '@/hooks/useLesson';
import { AddLessonDialog } from '@/components/course/AddLesson';
import { EditModuleDialog } from '@/components/course/EditModule';
import { DeleteModuleDialog } from '@/components/course/DeleteModule';

export const ModuleItem = ({ module, courseId, language }) => {
    const { mutate: handleReorder } = useReorderLessons();

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <>
            <Accordion
                type='multiple'
                className='border rounded-lg border-border bg-white'>
                <AccordionItem
                    key={module._id}
                    value={module._id}>
                    <AccordionTrigger className='px-4 py-4 items-center'>
                        <div className='w-full items-center flex justify-between text-slate-600'>
                            <div className='flex items-center gap-2'>
                                <LuLayers className='w-5 h-5' />
                                <p className='font-medium text-base text-gray-900'>{module.title}</p>
                            </div>
                            <div
                                className='flex gap-1'
                                onClick={e => e.stopPropagation()}>
                                <button
                                    role='button'
                                    className='cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors'
                                    onClick={() => setIsEditing(true)}>
                                    <LuPencil className='w-4 h-4' />
                                </button>
                                <button
                                    role='button'
                                    className='cursor-pointer hover:bg-red-100 p-2 rounded-md transition-colors'
                                    onClick={() => setIsDeleting(true)}>
                                    <LuTrash2 className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className='pl-12 pr-2 my-3 space-y-2'>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold'>Уроки модуля</p>
                            <Button
                                size='lg'
                                variant='secondary'
                                className='bg-gray-100'
                                onClick={() => setIsAdding(true)}>
                                <FaPlus />
                                <p>Додати урок</p>
                            </Button>
                        </div>
                        <SortableList
                            lessons={module.lessons}
                            onReorder={reordered => handleReorder(reordered)}
                            language={language}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <AddLessonDialog
                visible={isAdding}
                onClose={() => setIsAdding(false)}
                moduleId={module._id}
                courseId={courseId}
            />

            <EditModuleDialog
                visible={isEditing}
                onClose={() => setIsEditing(false)}
                module={module}
                courseId={courseId}
            />

            <DeleteModuleDialog
                visible={isDeleting}
                onClose={() => setIsDeleting(false)}
                moduleId={module._id}
            />
        </>
    );
};
