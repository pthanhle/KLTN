import { Calendar, Clock, MapPin, MessageSquareText } from 'lucide-react';
import { formatDriveLocation, formatDriveDate } from '../../utils/historyUtils';

const TicketDetails = ({ drive, t }) => {
    return (
        <div className="flex-1 min-w-0 p-6 md:p-8 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
                <div className="min-w-0 overflow-hidden">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                        {t('booking_id', 'Mã Đặt Lịch')}
                    </div>
                    <div
                        className="text-base md:text-lg font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-300 truncate font-mono"
                        title={`#${drive._id}`}
                    >
                        #{drive._id}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-y-6 gap-x-6 mb-2">
                <div className="flex items-center gap-3 min-w-[130px]">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 border border-slate-100 dark:border-white/5 transition-colors duration-300">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 whitespace-nowrap">{t('date', 'Ngày hẹn')}</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300 whitespace-nowrap">
                            {formatDriveDate(drive.selectedDate)}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 min-w-[130px]">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 border border-slate-100 dark:border-white/5 transition-colors duration-300">
                        <Clock size={18} />
                    </div>
                    <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 whitespace-nowrap">{t('time', 'Giờ hẹn')}</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300 whitespace-nowrap">{drive.selectedTimeSlot}</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full mt-2">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 border border-slate-100 dark:border-white/5 transition-colors duration-300">
                        <MapPin size={18} />
                    </div>
                    <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 whitespace-nowrap">{t('location', 'Địa điểm nhận xe')}</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 transition-colors duration-300">
                            {formatDriveLocation(drive, t)}
                        </div>
                    </div>
                </div>
            </div>

            {drive.note && (
                <div className="mt-8 bg-slate-50 dark:bg-[#0a0a0b] p-4 rounded-2xl border-l-[3px] border-yellow-500 border-t border-b border-r border-t-slate-100 border-b-slate-100 border-r-slate-100 dark:border-t-white/5 dark:border-b-white/5 dark:border-r-white/5 transition-colors duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageSquareText size={14} className="text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('customer_note', 'Ghi chú khách hàng')}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic font-medium leading-relaxed transition-colors duration-300">"{drive.note}"</p>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;
