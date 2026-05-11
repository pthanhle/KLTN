import React from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, closestCorners, DragOverlay } from '@dnd-kit/core';
import { useReceptionLogic } from './useReceptionLogic';
import IncomingBookingsPane from './components/IncomingBookingsPane';
import AdvisorWorkloadPane from './components/AdvisorWorkloadPane';
import BookingCard from './components/BookingCard';

const ReceptionTab = ({ selectedDate }) => {
    const {
        bookings,
        advisors,
        isLoading,
        handleDragStart,
        handleDragEnd,
        unassignedBookings,
        activeBooking
    } = useReceptionLogic(selectedDate);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    return (
        <div className="flex-1 flex overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl bg-white dark:bg-[#0a0a0b] h-full">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <IncomingBookingsPane
                    bookings={unassignedBookings}
                    isLoading={isLoading}
                />

                <AdvisorWorkloadPane
                    advisors={advisors}
                    bookings={bookings}
                    isLoading={isLoading}
                />

                <DragOverlay>
                    {activeBooking ? <BookingCard booking={activeBooking} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default ReceptionTab;
