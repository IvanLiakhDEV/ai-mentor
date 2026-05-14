import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
export const SortableList = ({ lessons, moduleId, onReorder }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    const handleDragEnd = event => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = lessons.findIndex(l => l._id === active.id);
        const newIndex = lessons.findIndex(l => l._id === over.id);

        const reordered = arrayMove(lessons, oldIndex, newIndex).map((lesson, index) => ({ ...lesson, sequenceNumber: index + 1 }));

        onReorder(reordered, moduleId);
    };
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
                items={lessons.map(l => l._id)}
                strategy={verticalListSortingStrategy}>
                {lessons.map(lesson => (
                    <SortableItem
                        key={lesson._id}
                        lesson={lesson}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
};

// {
//     lessons.map(lesson => (
//         <div
//             key={lesson._id}
//             className='flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100 hover:border-slate-300 transition-colors mt-2'>
//             <div className='flex items-center gap-2 flex-1'>
//                 <LuFileText className='w-4 h-4' />
//                 <span className='text-sm text-gray-700'>{lesson.title}</span>
//             </div>
//             <div className='flex gap-1'>
//                 <span
//                     role='button'
//                     className='cursor-pointer hover:bg-gray-100 p-2  rounded-md transition-colors'>
//                     <LuPencil className='w-4 h-4' />
//                 </span>
//                 <span
//                     role='button'
//                     className='cursor-pointer hover:bg-red-100 p-2  rounded-md transition-colors'>
//                     <LuTrash2 className='w-4 h-4' />
//                 </span>
//             </div>
//         </div>
//     ));
// }
