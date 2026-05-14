import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LuFileText, LuPencil, LuTrash2 } from 'react-icons/lu';

export function SortableItem({ lesson }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lesson._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className=''>
            <div
                key={lesson._id}
                className='flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 hover:border-slate-300 transition-colors mt-2'
                {...attributes}
                {...listeners}>
                <div className='flex items-center gap-2 flex-1'>
                    <LuFileText className='w-4 h-4' />
                    <span className='text-sm text-gray-700'>{lesson.title}</span>
                </div>
                <div className='flex gap-1'>
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
        </div>
    );
}
