import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Car, MoreVertical, AlertTriangle, Clock, User, Wrench, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Popover, Image } from 'antd';
import { calculateLeftPercentage, calculateWidthPercentage, calculateBlockBoundaries } from '../../utils/ganttUtils';

const ROBlock = ({ booking, isConflict, technicians, adjustDuration, selectedDateStr }) => {
    const { t } = useTranslation('adminServiceReception');

    const SERVICE_TYPE_LABELS = {
        MAINTENANCE: 'Bảo dưỡng',
        CAR_SPA: 'Chăm sóc xe',
        REPAIR: 'Sửa chữa',
        INSPECTION: 'Kiểm định',
        OTHER: 'Khác',
    };

    const displayCode = booking.booking_code || `#${String(booking._id).slice(-8).toUpperCase()}`;

    const now = new Date();
    const currMins = now.getHours() * 60 + now.getMinutes();

    const {
        displayStart,
        displayEnd,
        isContinuedFromYesterday,
        isContinuesToTomorrow,
        isOverdue,
        originalEndMins
    } = calculateBlockBoundaries(booking, selectedDateStr, currMins);

    let originalWidthPct = 100;

    // If it's overdue, the block is stretched to current time, but we need to visualize the original planned part
    // The original part ends at originalEndMins. The stretched part ends at currentMins (capped).
    // displayEnd might have been stretched to currentMins. Let's calculate percentage.
    if (isOverdue) {
        // Parse displayStart and displayEnd to mins to calculate percentage
        const startMins = parseInt(displayStart.split(':')[0]) * 60 + parseInt(displayStart.split(':')[1]);
        const endMins = parseInt(displayEnd.split(':')[0]) * 60 + parseInt(displayEnd.split(':')[1]);

        // The original planned end relative to this day's start
        const plannedEndMins = Math.max(startMins, Math.min(originalEndMins, endMins));
        if (endMins > startMins) {
            originalWidthPct = ((plannedEndMins - startMins) / (endMins - startMins)) * 100;
        }
    }

    const left = calculateLeftPercentage(displayStart);
    const width = calculateWidthPercentage(displayStart, displayEnd);

    // Time-based progress bar (0–100%)
    let progressPercent = 0;
    if (booking.expected_start_datetime && booking.expected_end_datetime) {
        const startMs = new Date(booking.expected_start_datetime).getTime();
        const endMs = new Date(booking.expected_end_datetime).getTime();
        const nowMs = now.getTime();
        if (nowMs > startMs && endMs > startMs) {
            progressPercent = Math.min(100, ((nowMs - startMs) / (endMs - startMs)) * 100);
        }
    }

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

    let displayTimeSlot = booking.time_slot;
    if (booking.expected_start_datetime && booking.expected_end_datetime) {
        const startDt = new Date(booking.expected_start_datetime);
        const endDt = new Date(booking.expected_end_datetime);
        
        const formatTime = (dt) => `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
        const formatDate = (dt) => `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (startDt.toDateString() === endDt.toDateString()) {
            displayTimeSlot = `${formatTime(startDt)} - ${formatTime(endDt)}`;
        } else {
            displayTimeSlot = `${formatTime(startDt)} (${formatDate(startDt)}) - ${formatTime(endDt)} (${formatDate(endDt)})`;
        }
    }

    const primaryTech = booking.primary_technician && technicians
        ? technicians.find(s => s._id === booking.primary_technician)
        : null;

    const assistantsCount = booking.assistant_technicians?.length || 0;

    const tooltipContent = (
        <div className="flex flex-col gap-2 p-1 min-w-[200px] text-slate-800 dark:text-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-2 mb-1">
                <span className="font-bold text-yellow-600 dark:text-yellow-500">{displayCode}</span>
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
                <span>{displayTimeSlot}</span>
            </div>
            {primaryTech && (
                <div className="flex items-center gap-2 text-xs">
                    <Wrench className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>KTV chính: <span className="font-semibold">{primaryTech.full_name}</span></span>
                </div>
            )}
            {assistantsCount > 0 && (() => {
                const assistantNames = (booking.assistant_technicians || [])
                    .map(id => technicians?.find(t => t._id === id)?.full_name)
                    .filter(Boolean)
                    .join(', ');
                return (
                    <div className="flex items-center gap-2 text-xs">
                        <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                        <span>KTV phụ: <span className="font-semibold">{assistantNames || `${assistantsCount} người`}</span></span>
                    </div>
                );
            })()}
            {booking.service_type && (
                <div className="flex items-center gap-2 text-xs">
                    <Layers className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>Nhóm: <span className="font-semibold">{SERVICE_TYPE_LABELS[booking.service_type] || booking.service_type}</span></span>
                </div>
            )}
            <div className="mt-1 bg-slate-50 dark:bg-white/5 p-2 rounded text-xs">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Hạng mục</div>
                {(booking.selected_services?.length > 0
                    ? booking.selected_services
                    : [{ name: 'Dịch vụ' }]
                ).map((s, i) => (
                    <div key={i} className="flex items-center gap-1 text-slate-700 dark:text-slate-300 py-0.5">
                        <span className="w-1 h-1 rounded-full bg-yellow-500 shrink-0" />
                        {s.name}
                    </div>
                ))}
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

    const blockContent = (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`top-3 bottom-3 shadow-sm hover:shadow-md flex flex-col justify-between border cursor-grab transition-all z-10 touch-none group ${isConflict
                ? 'border-red-500 animate-pulse'
                : (isOverdue ? 'border-red-400 dark:border-red-500/50 shadow-red-500/20' : 'border-slate-200 dark:border-white/10 hover:border-yellow-500/50')
                } ${isContinuedFromYesterday ? 'rounded-r-xl rounded-l-none border-l-0' : (isContinuesToTomorrow ? 'rounded-l-xl rounded-r-none border-r-0' : 'rounded-xl')}`}
        >
            {/* Arrows for multi-day */}
            {isContinuedFromYesterday && (
                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center bg-slate-200/50 dark:bg-white/10 w-4 z-20" title="Kế thừa từ hôm qua">
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">{'<'}</span>
                </div>
            )}
            {isContinuesToTomorrow && (
                <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-slate-200/50 dark:bg-white/10 w-4 z-20" title="Chuyển sang ngày mai">
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">{'>'}</span>
                </div>
            )}

            {/* Background Layers */}
            <div className={`absolute inset-0 flex overflow-hidden z-0 ${isContinuedFromYesterday ? 'rounded-r-xl rounded-l-none pl-4' : (isContinuesToTomorrow ? 'rounded-l-xl rounded-r-none pr-4' : 'rounded-xl')}`}>
                <div
                    style={{ width: `${isOverdue ? originalWidthPct : 100}%` }}
                    className={`h-full transition-all ${isConflict ? 'bg-red-500/10 dark:bg-red-500/20' : 'bg-white dark:bg-[#1c1c1e]'}`}
                ></div>
                {isOverdue && (
                    <div
                        style={{ width: `${100 - originalWidthPct}%` }}
                        className="h-full bg-red-50 dark:bg-red-900/20 border-l border-dashed border-red-400 dark:border-red-500/50 relative overflow-hidden transition-all"
                        title={t('tooltip_overdue', 'Quá giờ thi công dự kiến')}
                    >
                        <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ef4444 10px, #ef4444 20px)' }}></div>
                    </div>
                )}
            </div>

            {/* Hover overlay */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none ${isConflict ? 'bg-red-500/5' : 'bg-slate-50/50 dark:bg-white/5'} ${isContinuedFromYesterday ? 'rounded-r-xl rounded-l-none' : (isContinuesToTomorrow ? 'rounded-l-xl rounded-r-none' : 'rounded-xl')}`}></div>
            {primaryTech && (
                <div className="absolute -right-2 -top-2 flex items-center z-20 shadow-md">
                    <div className="w-6 h-6 rounded-full border-2 border-white dark:border-[#1c1c1e] overflow-hidden bg-slate-700 shrink-0 flex items-center justify-center">
                        <Image
                            src={primaryTech.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(primaryTech.full_name || '')}&background=random`}
                            alt={primaryTech.full_name}
                            className="w-full h-full object-cover"
                            preview={false}
                            fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(primaryTech.full_name || '')}&background=random`}
                        />
                    </div>
                    {assistantsCount > 0 && (
                        <div className="w-5 h-5 -ml-1.5 rounded-full border border-white dark:border-[#1c1c1e] bg-slate-600 dark:bg-slate-700 text-[9px] text-white flex items-center justify-center font-bold">
                            +{assistantsCount}
                        </div>
                    )}
                </div>
            )}

            <div className={`relative z-10 p-3 flex flex-col justify-between h-full pointer-events-none ${isContinuedFromYesterday ? 'ml-3' : ''} ${isContinuesToTomorrow ? 'mr-3' : ''}`}>
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="flex flex-col gap-1">
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${isOverdue ? 'text-red-500 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>
                            {displayCode} {isOverdue && t('status_overdue')}
                        </span>
                        <div className={`flex items-center gap-1.5 text-[10px] w-fit uppercase font-black tracking-wider px-2 py-0.5 rounded border shadow-inner ${isConflict
                            ? 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20'
                            : (isOverdue ? 'text-red-700 dark:text-red-300 bg-red-100/50 dark:bg-red-900/30 border-red-200 dark:border-red-500/30' : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-black/30 border-slate-200 dark:border-white/5')
                            }`}>
                            {isConflict ? <AlertTriangle className="w-3.5 h-3.5" /> : (isOverdue ? <Clock className="w-3.5 h-3.5 text-red-500" /> : <Car className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />)}
                            {booking.license_plate}
                        </div>
                    </div>
                    {isConflict ? (
                        <span className="text-[9px] font-black tracking-widest text-white bg-red-500 px-1.5 py-0.5 rounded shadow-sm">
                            {t('status_conflict', 'CONFLICT')}
                        </span>
                    ) : (
                        <MoreVertical className="w-4 h-4 text-slate-300 dark:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                </div>

                <div className="flex flex-col gap-0.5 overflow-hidden min-w-0 pr-1">
                    {booking.service_type && (
                        <div className="flex items-center gap-1 text-[9px] text-yellow-600 dark:text-yellow-500 font-semibold truncate">
                            <Layers className="w-2.5 h-2.5 shrink-0" />
                            {SERVICE_TYPE_LABELS[booking.service_type] || booking.service_type}
                        </div>
                    )}
                    <div className="flex items-center gap-1 truncate opacity-70 text-[10px]">
                        {booking.selected_services?.[0]?.name || 'Dịch vụ'}
                        {booking.selected_services?.length > 1 && (
                             <span className="text-[9px] font-bold text-slate-500">+{booking.selected_services.length - 1}</span>
                        )}
                    </div>
                    {primaryTech && (
                        <div className="flex items-center gap-1 text-[9px] text-slate-400 dark:text-slate-500 truncate">
                            <Wrench className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{primaryTech.full_name}</span>
                            {assistantsCount > 0 && <span className="shrink-0 text-slate-400">+{assistantsCount}</span>}
                        </div>
                    )}
                </div>
            </div>

            {/* Time-elapsed progress bar */}
            {progressPercent > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl overflow-hidden z-20 bg-slate-200/30 dark:bg-white/5">
                    <div
                        style={{ width: `${progressPercent}%` }}
                        className={`h-full transition-all duration-[60000ms] ease-linear ${isOverdue ? 'bg-red-500' : 'bg-emerald-500'}`}
                    />
                </div>
            )}
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
