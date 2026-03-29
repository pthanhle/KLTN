export const BOOKING_STATUS_CONFIG = {
    QUOTING: { label: 'Báo Giá', color: 'bg-amber-500', text: 'text-amber-500', bgClass: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20' },
    IN_PROGRESS: { label: 'Đang Xử Lý', color: 'bg-blue-500', text: 'text-blue-500', bgClass: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20' },
    COMPLETED: { label: 'Hoàn Thành', color: 'bg-emerald-500', text: 'text-emerald-500', bgClass: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' },
    CONFIRMED: { label: 'Đã Chốt', color: 'bg-emerald-500', text: 'text-emerald-500', bgClass: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' },
    DEFAULT: { label: 'Chờ Xử Lý', color: 'bg-slate-400', text: 'text-slate-500', bgClass: 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10' }
};

export const getBookingStatusConfig = (status) => {
    return BOOKING_STATUS_CONFIG[status] || BOOKING_STATUS_CONFIG.DEFAULT;
};
