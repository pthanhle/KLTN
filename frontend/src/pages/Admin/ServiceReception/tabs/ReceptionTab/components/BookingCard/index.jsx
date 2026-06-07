import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Lock, Calendar, Clock, MoreVertical, XCircle, CalendarClock, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBookingCard } from './hooks/useBookingCard';

const BookingCard = ({ booking, onReschedule, onNoShow, onViewDetail }) => {
    const { t } = useTranslation('adminServiceReception');
    const {
        isMenuOpen,
        handleMenuClick,
        closeMenu,
        handleReschedule,
        handleNoShow,
        handleCardClick,
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging
    } = useBookingCard(booking, onReschedule, onNoShow, onViewDetail);

    const isReceived = booking.status === 'RECEIVED';

    const SERVICE_TYPE_LABELS = {
        MAINTENANCE: 'Bảo dưỡng',
        CAR_SPA: 'Chăm sóc xe',
        REPAIR: 'Sửa chữa',
        INSPECTION: 'Kiểm định',
        OTHER: 'Khác',
    };

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 999 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={handleCardClick}
            className={`bg-white dark:bg-[#1c1c1e] rounded-xl p-5 shadow-lg dark:shadow-[0_15px_30px_rgba(0,0,0,0.3)] relative group hover:-translate-y-1 transition-transform touch-none border border-slate-100 dark:border-white/5 ${isReceived ? 'cursor-pointer opacity-80' : 'cursor-grab'}`}
        >
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />

            <div className="flex justify-between items-start mb-3 gap-2">
                <div className="flex flex-col gap-1.5">
                    <span className="w-fit bg-slate-50 dark:bg-[#0a0a0b] text-slate-500 dark:text-slate-400 px-2 py-1 rounded font-mono text-[10px] tracking-wider border border-slate-200 dark:border-white/10 shadow-inner">
                        {booking.booking_code}
                    </span>
                    <div className="flex items-center text-yellow-600 dark:text-yellow-500 text-[10px] font-bold">
                        <Calendar className="w-3 h-3 mr-1" />
                        {booking.booking_date_display}
                        <span className="mx-1.5 opacity-50">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        {booking.time_slot}
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    {booking.sequence_number != null && (
                        <span className="font-mono text-[10px] font-bold text-yellow-600 dark:text-yellow-500">
                            #{booking.sequence_number}
                        </span>
                    )}
                    {isReceived
                        ? <Lock className="text-emerald-500 w-4 h-4 shrink-0" title="Đã tiếp nhận" />
                        : <GripVertical className="text-slate-400 dark:text-slate-500 w-4 h-4 shrink-0 cursor-grab" />
                    }
                    {/* Stop click propagation so menu click doesn't open the drawer */}
                    <div className="relative" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleMenuClick}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-white/10"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </button>

                        {isMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-[1000]" onClick={closeMenu} />
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#2e3447] rounded-lg shadow-xl border border-slate-100 dark:border-white/10 z-[1001] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <button
                                        onClick={handleReschedule}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
                                    >
                                        <CalendarClock size={16} className="text-yellow-600 dark:text-premium-gold" />
                                        {t('action_reschedule', 'Reschedule')}
                                    </button>
                                    <button
                                        onClick={handleNoShow}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                    >
                                        <XCircle size={16} />
                                        {t('action_no_show', 'No-show')}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight">
                    {booking.customer_name} {booking.is_vip && <span className="text-yellow-500 dark:text-yellow-400 ml-1">★</span>}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {booking.vehicle_brand} {booking.vehicle_model} • {booking.license_plate}
                </p>
            </div>

            <div className="mb-4 bg-slate-50 dark:bg-[#0a0a0b] p-3 rounded-lg border border-slate-200 dark:border-white/5 shadow-inner">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1 block">
                    {t('bookingCard_symptoms', 'Symptoms / Notes')}
                </span>
                <p className="text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                    {booking.vehicle_condition || t('bookingCard_noSymptoms', 'No specific symptoms noted.')}
                </p>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
                {booking.service_type && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 dark:bg-yellow-500/10 text-[11px] font-bold text-yellow-700 dark:text-yellow-400 rounded-md border border-yellow-200 dark:border-yellow-500/30">
                        <Wrench className="w-3 h-3" />
                        {SERVICE_TYPE_LABELS[booking.service_type] || booking.service_type}
                    </span>
                )}
                {booking.selected_services?.map((service, index) => (
                    <span key={index} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-[11px] font-medium text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-white/10">
                        {service.name}
                    </span>
                ))}
                {!booking.service_type && !booking.selected_services?.length && (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                        {t('bookingCard_noService', 'Chưa có dịch vụ')}
                    </span>
                )}
            </div>

            {/* Hover hint */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity">
                <span className="text-[10px] text-slate-400 italic">Nhấn để xem chi tiết</span>
            </div>
        </div>
    );
};

export default BookingCard;
