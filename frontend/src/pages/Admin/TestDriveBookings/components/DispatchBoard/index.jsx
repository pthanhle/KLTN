import React from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import BacklogPane from './Backlog/index';
import ResourcePane from './Resource/index';
import { useDispatchLogic } from '../../hooks/useDispatchLogic';
import { BookingCardUI } from './Backlog/BookingCard';
import AssignConfirmModal from './AssignModal';
import { TaskDetailModal } from '../../../Shared/components/TaskDetailModal';

const DispatchBoard = ({ t }) => {
    const {
        pendingBookings,
        staffList,
        isLoading,
        searchStaff,
        setSearchStaff,
        activeBooking,
        handleDragStart,
        handleDragEnd,
        handleDragCancel,
        isAssignModalOpen,
        pendingAssignmentData,
        confirmAssignment,
        closeAssignModal,
        isAssigning,
        filterDate,
        setFilterDate
    } = useDispatchLogic(t);

    const [selectedTask, setSelectedTask] = React.useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    return (
        <div className="w-full flex flex-row h-full overflow-hidden animate-fade-in bg-transparent">
            <DndContext 
                sensors={sensors} 
                onDragStart={handleDragStart} 
                onDragEnd={handleDragEnd} 
                onDragCancel={handleDragCancel}
            >
                <BacklogPane
                    bookings={pendingBookings}
                    isLoading={isLoading}
                    t={t}
                />
                <ResourcePane
                    staffList={staffList}
                    isLoading={isLoading}
                    searchStaff={searchStaff}
                    setSearchStaff={setSearchStaff}
                    filterDate={filterDate}
                    setFilterDate={setFilterDate}
                    t={t}
                    onTaskClick={setSelectedTask}
                />
                
                <DragOverlay dropAnimation={{
                    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }),
                }}>
                    {activeBooking ? (
                        <BookingCardUI 
                            booking={activeBooking} 
                            t={t} 
                            isDragging={true}
                            style={{ cursor: 'grabbing', opacity: 1, zIndex: 9999 }}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <AssignConfirmModal
                isOpen={isAssignModalOpen}
                onClose={closeAssignModal}
                onConfirm={confirmAssignment}
                pendingData={pendingAssignmentData}
                isAssigning={isAssigning}
            />

            {selectedTask && (
                <TaskDetailModal 
                    task={selectedTask} 
                    onClose={() => setSelectedTask(null)} 
                />
            )}
        </div>
    );
};

export default DispatchBoard;
