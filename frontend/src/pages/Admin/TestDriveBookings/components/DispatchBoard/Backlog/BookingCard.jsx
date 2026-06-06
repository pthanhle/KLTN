import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useBookingCardLogic } from './hooks/useBookingCardLogic';
import { ClaimRequestGroup } from './components/ClaimRequestGroup';

export const BookingCardUI = ({ booking, t, isDragging, style, setNodeRef, listeners, attributes, onAssignFromRequest }) => {
    const {
        typeTheme,
        typeBadgeLabel,
        cardClassNames,
        carName,
        requestedStaff,
        hasRequests,
        requestedClaimLabel
    } = useBookingCardLogic(booking, isDragging, t);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cardClassNames}
        >
            <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-colors pointer-events-none rounded-r-2xl" />

            <div className="flex justify-between items-start mb-3 relative z-10">
                <div>
                    <p className="font-bold text-slate-800 dark:text-white text-base truncate">{booking.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{booking.phoneNumber}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shrink-0 ml-2 ${typeTheme.badge}`}>
                    {typeBadgeLabel}
                </span>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 mb-3 border border-slate-200 dark:border-white/5 relative z-10">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800 dark:text-white tracking-tight truncate pr-2">
                        {carName}
                    </span>
                    <span className="text-[10px] bg-white dark:bg-[#141416] text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-white/10 tracking-widest font-mono shrink-0">
                        {booking.targetCarSku}
                    </span>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 px-3 py-2 rounded-lg border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center relative group overflow-hidden">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 relative z-10">
                    <div className="flex items-center gap-1">
                        <CalendarOutlined className="text-[14px]" />
                        {booking.selectedDate}
                    </div>
                    <div className="flex items-center gap-1">
                        <ScheduleOutlined className="text-[14px]" />
                        {booking.selectedTimeSlot}
                    </div>
                </div>
            </div>

            <ClaimRequestGroup
                requestedStaff={requestedStaff}
                label={requestedClaimLabel}
                onAssignStaff={onAssignFromRequest ? (staff) => onAssignFromRequest(booking, staff) : undefined}
            />
        </div>
    );
};

const BookingCard = ({ booking, t, onAssignFromRequest }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: booking._id,
        data: {
            type: 'Booking',
            booking
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 50 : 1,
    };

    return (
        <BookingCardUI
            booking={booking}
            t={t}
            isDragging={isDragging}
            style={style}
            setNodeRef={setNodeRef}
            listeners={listeners}
            attributes={attributes}
            onAssignFromRequest={onAssignFromRequest}
        />
    );
};

export default BookingCard;