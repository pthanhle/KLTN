export const WORKLOAD_THRESHOLDS = {
    EMPTY: 0,
    MODERATE: 2,
    OVERLOADED: 4
};

export const WORKLOAD_THEMES = {
    EMPTY: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:border-white/10',
    NORMAL: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-500 dark:border-green-500/20',
    MODERATE: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-500 dark:border-yellow-500/20',
    OVERLOADED: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20'
};

export const TASK_PRIORITIES = {
    URGENT: 'URGENT',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
};

export const PRIORITY_THEMES = {
    [TASK_PRIORITIES.URGENT]: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500 border border-rose-200 dark:border-rose-500/20',
    [TASK_PRIORITIES.HIGH]: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500 border border-orange-200 dark:border-orange-500/20',
    [TASK_PRIORITIES.MEDIUM]: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20',
    [TASK_PRIORITIES.LOW]: 'bg-slate-50 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20'
};

export const BOOKING_TYPE_THEMES = {
    HOME: {
        border: 'border-blue-500',
        badge: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500'
    },
    SHOWROOM: {
        border: 'border-yellow-500',
        badge: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-500'
    }
};
