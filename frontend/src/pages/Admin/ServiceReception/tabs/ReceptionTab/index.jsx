import React from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, closestCorners, DragOverlay } from '@dnd-kit/core';
import { useReceptionLogic } from './useReceptionLogic';
import IncomingBookingsPane from './components/IncomingBookingsPane';
import AdvisorWorkloadPane from './components/AdvisorWorkloadPane';
import BookingCard from './components/BookingCard';
import RescheduleModal from './components/RescheduleModal';
import ServiceBookingDetailDrawer from './components/ServiceBookingDetailDrawer';
import ConfirmModal from '../../../../../components/ui/ConfirmModal';
import { useTranslation } from 'react-i18next';

const ReceptionTab = ({ selectedDate }) => {
    const { t } = useTranslation('adminServiceReception');
    const {
        bookings,
        advisors,
        isLoading,
        handleDragStart,
        handleDragEnd,
        unassignedBookings,
        activeBooking,
        rescheduleBooking,
        handleRescheduleClick,
        confirmNoShow,
        handleNoShowConfirm,
        handleNoShowCancel,
        bookingToMarkNoShow,
        isRescheduleModalOpen,
        setIsRescheduleModalOpen,
        selectedBookingForReschedule,
        handleViewDetail,
        handleCloseDetail,
        selectedBookingForDetail,
        isDetailDrawerOpen,
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
                    onReschedule={handleRescheduleClick}
                    onNoShow={confirmNoShow}
                    onViewDetail={handleViewDetail}
                />

                <AdvisorWorkloadPane
                    advisors={advisors}
                    bookings={bookings}
                    isLoading={isLoading}
                    onReschedule={handleRescheduleClick}
                    onNoShow={confirmNoShow}
                    onViewDetail={handleViewDetail}
                />

                <DragOverlay>
                    {activeBooking ? <BookingCard booking={activeBooking} /> : null}
                </DragOverlay>
            </DndContext>

            {isRescheduleModalOpen && selectedBookingForReschedule && (
                <RescheduleModal
                    booking={selectedBookingForReschedule}
                    isOpen={isRescheduleModalOpen}
                    onClose={() => setIsRescheduleModalOpen(false)}
                    onSave={rescheduleBooking}
                />
            )}

            <ConfirmModal
                isOpen={!!bookingToMarkNoShow}
                onClose={handleNoShowCancel}
                onConfirm={handleNoShowConfirm}
                title={t('modal_no_show_title', 'Khách không đến?')}
                description={t('modal_no_show_desc', 'Xác nhận đánh dấu khách hàng này là vắng mặt? Hệ thống sẽ cập nhật trạng thái lịch hẹn này.')}
                confirmText={t('action_no_show', 'Đánh dấu')}
                cancelText={t('modal_reschedule_btn_cancel', 'Hủy')}
                iconType="alert"
            />

            <ServiceBookingDetailDrawer
                booking={selectedBookingForDetail}
                advisors={advisors}
                open={isDetailDrawerOpen}
                onClose={handleCloseDetail}
            />
        </div>
    );
};

export default ReceptionTab;
