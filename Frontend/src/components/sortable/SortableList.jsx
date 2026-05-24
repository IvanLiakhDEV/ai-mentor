import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export const SortableList = ({ lessons, onReorder, language }) => {
    const [lessonList, setLessonList] = useState(lessons);
    useEffect(() => {
        setLessonList(lessons);
    }, [lessons]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = event => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = lessonList.findIndex(l => l._id === active.id);
        const newIndex = lessonList.findIndex(l => l._id === over.id);

        const reordered = arrayMove(lessonList, oldIndex, newIndex).map((lesson, index) => ({ ...lesson, sequenceNumber: index + 1 }));
        setLessonList(reordered);
        onReorder(reordered);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
                items={lessonList.map(l => l._id)}
                strategy={verticalListSortingStrategy}>
                {lessonList.map(lesson => (
                    <SortableItem
                        key={lesson._id}
                        lesson={lesson}
                        language={language}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
};
