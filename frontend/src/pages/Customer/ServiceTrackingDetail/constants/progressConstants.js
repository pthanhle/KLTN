// Định nghĩa hằng số cho Module Tiến Độ (Progress Tracking)

export const PROGRESS_STATUSES = {
    DONE: 'done',
    ACTIVE: 'active',
    PENDING: 'pending',
    WARNING: 'warning',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed'
};

export const LOG_TYPE_COLORS = {
    SUCCESS: 'text-emerald-600 dark:text-[#4edea3]/80',
    INFO: 'text-yellow-600 dark:text-[#d4af37]/80',
    WARNING: 'text-red-500 dark:text-red-400/80',
    SYSTEM: 'text-slate-500 dark:text-[#a0a0a0]/80'
};

export const LOG_TYPE_LABELS = {
    SUCCESS: 'OK',
    INFO: 'INF',
    WARNING: 'LOG',
    SYSTEM: 'SYS'
};

export const APPROVAL_STATUSES = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

export const PART_STATUS_LABELS = {
    PENDING: 'Đang đợi nhập khẩu',
    INSTALLING: 'Đang thi công',
    DONE: 'Đã hoàn tất',
    IN_STOCK: 'Đã sẵn sàng'
};
