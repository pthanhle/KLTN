import React from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, closestCorners, DragOverlay } from '@dnd-kit/core';
import GanttSkeleton from './components/GanttSkeleton';
import { useWorkshopLogic } from './hooks/useWorkshopLogic';
import FilterToolbar from './components/FilterToolbar';
import GanttGrid from './components/GanttGrid';
import ROBlock from './components/GanttGrid/ROBlock';
import UnassignedQueue from './components/UnassignedQueue';
import AssignmentModal from './components/Modals/AssignmentModal';

const WorkshopTab = ({ selectedDate }) => {
    const {
        bookings,
        unassignedBookings,
        bays,
        technicians,
        isLoading,
        searchTerm,
        setSearchTerm,
        activeBooking,
        handleDragStart,
        handleDragEnd,
        adjustDuration,
        pendingAssignment,
        confirmAssignment,
        cancelAssignment,
        selectedDateStr
    } = useWorkshopLogic(selectedDate);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    if (isLoading) {
        return <GanttSkeleton />;
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0a0b] h-full p-4 md:p-6">
            <FilterToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="flex-1 overflow-hidden relative rounded-xl">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex h-full w-full">
                        <div className="flex-1 h-full overflow-y-auto custom-scrollbar border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#0a0a0b]">
                            <GanttGrid bays={bays} bookings={bookings} technicians={technicians} adjustDuration={adjustDuration} activeBooking={activeBooking} selectedDateStr={selectedDateStr} />
                        </div>

                        <UnassignedQueue bookings={unassignedBookings} />
                    </div>

                    <DragOverlay>
                        {activeBooking ? <ROBlock booking={activeBooking} selectedDateStr={selectedDateStr} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>

            <AssignmentModal
                visible={!!pendingAssignment}
                assignmentData={pendingAssignment}
                technicians={technicians}
                onConfirm={confirmAssignment}
                onCancel={cancelAssignment}
            />
        </div>
    );
};

export default WorkshopTab;
