import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Car, MoreVertical, AlertTriangle, Clock, User, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Popover, Image } from 'antd';
import { calculateLeftPercentage, calculateWidthPercentage } from '../../utils/ganttUtils';

const ROBlock = ({ booking, isConflict, technicians, adjustDuration }) => {
    const { t } = useTranslation('adminServiceReception');

    const timeParts = booking.time_slot.split(' - ');
    const startTime = timeParts[0];
    const endTime = timeParts[1] || '17:00';

    const left = calculateLeftPercentage(startTime);
    const width = calculateWidthPercentage(startTime, endTime);

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
        zIndex: isDragging ? 999 : (isConflict ? 30 : 10),
        left: left,
        width: width,
        position: 'absolute',
        touchAction: 'none'
    };

    const tooltipContent = (
        <div className="flex flex-col gap-2 p-1 min-w-[200px] text-slate-800 dark:text-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-2 mb-1">
                <span className="font-bold text-yellow-600 dark:text-yellow-500">{booking._id}</span>
                <span className="bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300">
                    {t(`status_${booking.status}`, booking.status)}
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
            <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{booking.time_slot}</span>
            </div>
            <div className="flex items-start gap-2 text-xs mt-1 bg-slate-50 dark:bg-white/5 p-2 rounded">
                <Wrench className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">{booking.selected_services?.join(', ') || 'Dịch vụ'}</span>
            </div>

            <div className="flex gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-white/10">
                <button
                    onClick={(e) => { e.stopPropagation(); adjustDuration(booking._id, -30); }}
                    className="flex-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 py-1 rounded text-xs text-slate-700 dark:text-slate-300 font-bold transition-colors"
                >
                    {t('tooltip_sub_time', '-30m')}
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); adjustDuration(booking._id, 30); }}
                    className="flex-1 bg-yellow-100 dark:bg-yellow-500/10 hover:bg-yellow-200 dark:hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-500 py-1 rounded text-xs font-bold transition-colors"
                >
                    {t('tooltip_add_time', '+30m')}
                </button>
            </div>
        </div>
    );

    const primaryTech = booking.primary_technician && technicians
        ? technicians.find(s => s._id === booking.primary_technician)
        : null;

    const assistantsCount = booking.assistant_technicians?.length || 0;

    const blockContent = (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`top-3 bottom-3 rounded-xl shadow-sm hover:shadow-md p-3 flex flex-col justify-between border cursor-grab transition-all z-10 touch-none group ${isConflict
                ? 'bg-red-500/10 dark:bg-red-500/20 border-red-500 animate-pulse'
                : 'bg-white dark:bg-[#1c1c1e] border-slate-200 dark:border-white/10 hover:border-yellow-500/50'
                }`}
        >
            {primaryTech && (
                <div className="absolute -right-2 -top-2 flex items-center z-20 shadow-md">
                    <div className="w-6 h-6 rounded-full border-2 border-white dark:border-[#1c1c1e] overflow-hidden bg-slate-700 shrink-0 flex items-center justify-center">
                        <Image
                            src={primaryTech.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(primaryTech.fullName)}&background=random`}
                            alt={primaryTech.fullName}
                            className="w-full h-full object-cover"
                            preview={false}
                            fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(primaryTech.fullName)}&background=random`}
                        />
                    </div>
                    {assistantsCount > 0 && (
                        <div className="w-5 h-5 -ml-1.5 rounded-full border border-white dark:border-[#1c1c1e] bg-slate-600 dark:bg-slate-700 text-[9px] text-white flex items-center justify-center font-bold">
                            +{assistantsCount}
                        </div>
                    )}
                </div>
            )}

            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity ${isConflict ? 'bg-red-500/5' : 'bg-slate-50/50 dark:bg-white/5'}`}></div>

            <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{booking._id}</span>
                    <div className={`flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded border shadow-inner ${isConflict
                        ? 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20'
                        : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-black/30 border-slate-200 dark:border-white/5'
                        }`}>
                        {isConflict ? <AlertTriangle className="w-3.5 h-3.5" /> : <Car className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />}
                        {booking.license_plate}
                    </div>
                </div>
                {isConflict ? (
                    <span className="text-[9px] font-black tracking-widest text-white bg-red-500 px-1.5 py-0.5 rounded shadow-sm">
                        {t('status_conflict', 'CONFLICT')}
                    </span>
                ) : (
                    <MoreVertical className="w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
            </div>

            <p className={`text-[11px] font-medium leading-snug truncate mt-1 relative z-10 ${isConflict ? 'text-red-700 dark:text-red-300' : 'text-slate-600 dark:text-slate-400'}`}>
                {booking.selected_services?.[0] || 'Dịch vụ'}
            </p>
        </div>
    );

    if (isDragging) return blockContent;

    return (
        <Popover content={tooltipContent} placement="bottom" trigger="hover">
            {blockContent}
        </Popover>
    );
};

export default ROBlock;
