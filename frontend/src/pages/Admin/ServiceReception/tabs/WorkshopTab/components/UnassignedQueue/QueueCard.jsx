import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Car, Wrench, MoreVertical, User } from 'lucide-react';
import { Popover } from 'antd';
import { useTranslation } from 'react-i18next';

const QueueCard = ({ booking }) => {
    const { t } = useTranslation('adminServiceReception');
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: booking._id,
        data: {
            type: 'workshop_booking',
            booking,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 999 : 10,
        touchAction: 'none'
    };

    const tooltipContent = (
        <div className="flex flex-col gap-2 p-1 min-w-[200px] text-slate-800 dark:text-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-2 mb-1">
                <span className="font-bold text-yellow-600 dark:text-yellow-500">
                    {booking.sequence_number != null ? `#${booking.sequence_number}` : booking.booking_code || booking._id}
                </span>
                <span className="bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300">
                    {t(`status_${booking.status}`, booking.status)}
                </span>
            </div>
            <div className="flex items-center gap-2 mt-3 px-1 py-0.5 max-w-full">
                <span className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                    {booking.selected_services?.map(s => s.name).join(', ') || 'Dịch vụ'}
                </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
                <Car className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{booking.license_plate} - {booking.vehicle_model}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
                <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{booking.customer_name}</span>
            </div>
            <div className="flex items-start gap-2 text-xs mt-1 bg-slate-50 dark:bg-white/5 p-2 rounded">
                <Wrench className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">{booking.vehicle_condition || t('bookingCard_noSymptoms')}</span>
            </div>
        </div>
    );

    const cardContent = (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 p-3 rounded-xl shadow-sm hover:shadow-md hover:border-yellow-500/50 cursor-grab group transition-all"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-black/30 text-slate-700 dark:text-slate-300 shadow-inner">
                    <Car className="w-3 h-3 text-slate-400" />
                    {booking.license_plate}
                </div>
                <div className="flex items-center gap-1.5">
                    {booking.sequence_number != null && (
                        <span className="font-mono text-[10px] font-bold text-yellow-600 dark:text-yellow-500">
                            #{booking.sequence_number}
                        </span>
                    )}
                    <MoreVertical className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-snug line-clamp-2">
                {booking.selected_services?.map(s => s.name).join(', ') || 'Dịch vụ'}
            </p>
        </div>
    );

    if (isDragging) return cardContent;

    return (
        <Popover content={tooltipContent} placement="left" trigger="hover">
            {cardContent}
        </Popover>
    );
};

export default QueueCard;
