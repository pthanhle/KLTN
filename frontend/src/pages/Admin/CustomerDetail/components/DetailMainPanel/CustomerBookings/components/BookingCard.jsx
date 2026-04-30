import React from 'react';
import { CalendarClock, CarFront } from 'lucide-react';
import { formatDate } from '../../../../../Customers/utils/format';
import { mapBookingData } from '../utils/bookingMapping';

export const BookingCard = ({ booking, t }) => {
    const {
        statusConfig,
        serviceName,
        carName,
        date,
        timeSlot,
        bookingCode,
        progressRatio,
        isStep1,
        isStep2,
        isStep3
    } = mapBookingData(booking, t);

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5 hover:border-yellow-500/30 dark:hover:border-premium-gold/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-yellow-500/5 dark:hover:shadow-black/20 relative overflow-hidden">
            <div className={`absolute inset-y-0 left-0 w-1 ${statusConfig.color}`}></div>
            
            <div className="flex justify-between items-start mb-6 pl-2">
                <div>
                    <p className="text-[10px] text-yellow-600 dark:text-premium-gold uppercase font-black tracking-widest mb-1.5 flex items-center gap-2">
                        <CalendarClock size={12} />
                        {formatDate(date)} • {timeSlot}
                    </p>
                    <h4 className="font-black text-slate-800 dark:text-white text-base tracking-tight mb-1">{serviceName}</h4>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        <CarFront size={12} /> {carName}
                    </p>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${statusConfig.bgClass} ${statusConfig.text}`}>
                    {statusConfig.label}
                </div>
            </div>

            <div className="space-y-3 pl-2">
                <div className="relative w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className={`absolute h-full transition-all duration-1000 ${statusConfig.color} ${progressRatio}`}></div>
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    <span className={isStep1 ? 'text-slate-800 dark:text-white' : ''}>{t('adminCustomers:stepReceived', 'Tiếp nhận')}</span>
                    <span className={isStep2 ? 'text-slate-800 dark:text-white' : ''}>{t('adminCustomers:stepInProgress', 'Thực hiện')}</span>
                    <span className={isStep3 ? 'text-slate-800 text-right dark:text-white' : 'text-right'}>{t('adminCustomers:stepHandover', 'Bàn giao')}</span>
                </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 pl-2 flex justify-between items-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {t('adminCustomers:lblBookingStatusId', 'Mã Trạng Thái')}: <span className="text-slate-800 dark:text-white font-black">{bookingCode}</span>
                </p>
                {booking.payment_status === 'UNPAID' && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title={t('adminCustomers:tooltipUnpaid', 'Chưa thanh toán')}></span>
                )}
            </div>
        </div>
    );
};
