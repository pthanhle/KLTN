export const ATTENDANCE_STATUS = {
    ON_TIME: 'ON_TIME',
    LATE: 'LATE',
    ABSENT: 'ABSENT',
    DAY_OFF: 'DAY_OFF'
};

export const STATUS_STYLES = {
    [ATTENDANCE_STATUS.ON_TIME]: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-500',
    [ATTENDANCE_STATUS.LATE]: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-500',
    [ATTENDANCE_STATUS.ABSENT]: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-500',
    [ATTENDANCE_STATUS.DAY_OFF]: 'bg-slate-500/10 border-slate-500/20 text-slate-600 dark:text-slate-400'
};

export const STATUS_DOT_STYLES = {
    [ATTENDANCE_STATUS.ON_TIME]: 'bg-emerald-500',
    [ATTENDANCE_STATUS.LATE]: 'bg-yellow-500',
    [ATTENDANCE_STATUS.ABSENT]: 'bg-rose-500',
    [ATTENDANCE_STATUS.DAY_OFF]: 'bg-slate-400'
};
