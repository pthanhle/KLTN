import { Tag } from 'antd';

const StatusBadge = ({ status, t }) => {
    switch (status) {
        case 'Pending':
            return (
                <div className="w-fit shrink-0 whitespace-nowrap px-4 py-1.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-full text-amber-600 dark:text-amber-500 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 h-fit shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {t('booking_status_pending', 'Chờ xác nhận')}
                </div>
            );
        case 'Confirmed':
            return (
                <div className="w-fit shrink-0 whitespace-nowrap px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 h-fit shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {t('booking_status_confirmed', 'Đã xác nhận')}
                </div>
            );
        case 'InProgress':
            return (
                <div className="w-fit shrink-0 whitespace-nowrap px-3 py-1 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 rounded-full text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 h-fit shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                    {t('booking_status_inprogress', 'Đang diễn ra')}
                </div>
            );
        case 'Completed':
            return (
                <div className="w-fit shrink-0 whitespace-nowrap px-4 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-full text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 h-fit shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {t('booking_status_completed', 'Hoàn thành')}
                </div>
            );
        case 'Cancelled':
        default:
            return (
                <div className="w-fit shrink-0 whitespace-nowrap px-3 py-1 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-full text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 h-fit shadow-sm opacity-80">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {t('booking_status_cancelled', 'Đã hủy')}
                </div>
            );
    }
};

export default StatusBadge;
