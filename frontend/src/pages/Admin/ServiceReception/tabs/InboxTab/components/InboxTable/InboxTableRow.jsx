import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, CalendarDays, CheckCircle2, MessageSquare, AlertCircle, Phone, Crown } from 'lucide-react';
import { calculateAging } from '../../utils/timeUtils';
import dayjs from 'dayjs';

const InboxTableRow = ({ booking, onConfirm, onReject }) => {
    const { t } = useTranslation('adminServiceReception');
    const aging = calculateAging(booking.created_at);

    const formattedDate = booking.booking_date ? dayjs(booking.booking_date).format('DD/MM/YYYY') : t('inbox_not_available', 'N/A');

    return (
        <div className={`group flex flex-col md:flex-row px-6 py-5 border-b border-slate-100 dark:border-white/5 transition-colors relative
            ${aging.isCritical ? 'bg-red-50/50 hover:bg-red-50 dark:bg-red-950/10 dark:hover:bg-red-900/20' : 'hover:bg-slate-50 dark:hover:bg-white/5'}
            ${booking.is_vip ? 'bg-yellow-50/30 dark:bg-yellow-900/10' : ''}
        `}>
            <div className="w-full md:w-[10%] flex flex-col gap-1 mb-3 md:mb-0">
                <div className={`flex items-center gap-1.5 font-bold ${aging.isCritical ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    <Clock size={16} />
                    <span>{aging.display}</span>
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                    {t('inbox_status_pending', 'Pending')}
                </div>
            </div>

            <div className="w-full md:w-[20%] flex flex-col gap-1 pr-4 mb-3 md:mb-0">
                <div className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {booking.customer_name}
                    {booking.is_vip && (
                        <Crown size={14} className="text-yellow-500 fill-yellow-500" />
                    )}
                </div>
                {booking.is_vip && (
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 font-semibold mb-1">
                        {t('inbox_badge_vip', 'VIP Member')}
                    </div>
                )}
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <Phone size={14} />
                    <span>{booking.customer_phone || t('inbox_not_available', 'N/A')}</span>
                </div>
            </div>

            <div className="w-full md:w-[20%] flex flex-col gap-1 pr-4 mb-3 md:mb-0">
                <div className="font-bold text-slate-800 dark:text-white">
                    {booking.vehicle_brand} {booking.vehicle_model}
                </div>
                <div className="text-sm font-mono bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 w-fit px-2 py-0.5 rounded border border-slate-200 dark:border-white/10 mt-1">
                    {booking.license_plate}
                </div>
            </div>

            {/* Request Details Column */}
            <div className="w-full md:w-[30%] flex flex-col gap-2 pr-4 mb-3 md:mb-0">
                <div className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <CalendarDays size={16} className="text-blue-500" />
                    {formattedDate}, {booking.time_slot}
                </div>
                {booking.vehicle_condition && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic">
                        "{booking.vehicle_condition}"
                    </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                    {booking.selected_services?.map((service, idx) => (
                        <span key={idx} className="bg-white dark:bg-[#1a1a1c] text-slate-600 dark:text-slate-300 text-[11px] uppercase tracking-wider px-2 py-1 rounded border border-slate-200 dark:border-white/10 truncate max-w-[150px]">
                            {service}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions Column */}
            <div className="w-full md:w-[20%] flex flex-col md:flex-row md:justify-end gap-2 items-start mt-2 md:mt-0">
                <button
                    onClick={() => onReject(booking._id)}
                    className="w-full md:w-auto bg-transparent hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 uppercase text-[11px] font-bold tracking-widest px-4 py-3 rounded-full transition-all"
                >
                    {t('action_reject', 'Reject')}
                </button>
                <button
                    onClick={() => onConfirm(booking._id)}
                    className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-900 uppercase text-[11px] font-black tracking-widest px-6 py-3 rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                    {t('inbox_btn_confirm', 'Confirm')}
                </button>
            </div>
        </div>
    );
};

export default InboxTableRow;
