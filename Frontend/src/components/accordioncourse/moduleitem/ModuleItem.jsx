import React from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '../../ui/Accordion';
import { LuFileText, LuLayers, LuPencil, LuTrash2 } from 'react-icons/lu';
import { Button } from '../../ui/Button';
import { FaPlus } from 'react-icons/fa6';
import { SortableList } from '../../sortable/SortableList';

export const ModuleItem = ({ module }) => {
    return (
        <Accordion
            type='multiple'
            className='border rounded-lg  border-border bg-white'>
            <AccordionItem
                key={module._id}
                value={module._id}>
                <AccordionTrigger className='px-4 py-4  items-center '>
                    <div className='w-full items-center flex justify-between text-slate-600'>
                        <div className='flex items-center gap-2'>
                            <LuLayers className='w-5 h-5' />
                            <p className='font-medium text-base text-gray-900'>{module.title}</p>
                        </div>
                        <div
                            className='flex gap-1 transition-colors'
                            onClick={e => e.stopPropagation()}>
                            <span
                                role='button'
                                className='cursor-pointer hover:bg-gray-100 p-2  rounded-md transition-colors'>
                                <LuPencil className='w-4 h-4' />
                            </span>
                            <span
                                role='button'
                                className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'>
                                <LuTrash2 className='w-4 h-4' />
                            </span>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className='pl-12 pr-2 mt-3  space-y-2'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <p>Уроки модуля</p>
                            <Button
                                size='lg'
                                variant='secondary'
                                className='bg-gray-100'>
                                <FaPlus />
                                <p>Додати урок</p>
                            </Button>
                        </div>
                        <SortableList lessons={module.lessons} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
