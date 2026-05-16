export const ORDER_STATUSES = {
    PENDING: {
        value: 'PENDING',
        color: 'text-yellow-600 dark:text-yellow-500',
        bg: 'bg-yellow-50 dark:bg-yellow-500/10',
        border: 'border-yellow-200 dark:border-yellow-500/20'
    },
    CONFIRMED: {
        value: 'CONFIRMED',
        color: 'text-blue-600 dark:text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        border: 'border-blue-200 dark:border-blue-500/20'
    },
    SHIPPING: {
        value: 'SHIPPING',
        color: 'text-orange-600 dark:text-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-500/10',
        border: 'border-orange-200 dark:border-orange-500/20'
    },
    COMPLETED: {
        value: 'COMPLETED',
        color: 'text-emerald-600 dark:text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        border: 'border-emerald-200 dark:border-emerald-500/20'
    },
    CANCELLED: {
        value: 'CANCELLED',
        color: 'text-rose-600 dark:text-rose-500',
        bg: 'bg-rose-50 dark:bg-rose-500/10',
        border: 'border-rose-200 dark:border-rose-500/20'
    }
};

export const PAYMENT_STATUSES = {
    PAID: {
        value: 'PAID',
        color: 'text-emerald-600 dark:text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        border: 'border-emerald-200 dark:border-emerald-500/20'
    },
    UNPAID: {
        value: 'UNPAID',
        color: 'text-rose-600 dark:text-rose-500',
        bg: 'bg-rose-50 dark:bg-rose-500/10',
        border: 'border-rose-200 dark:border-rose-500/20'
    },
    REFUNDED: {
        value: 'REFUNDED',
        color: 'text-slate-600 dark:text-slate-400',
        bg: 'bg-slate-50 dark:bg-slate-500/10',
        border: 'border-slate-200 dark:border-slate-500/20'
    }
};

export const STEP_STATUS_MAP = {
    'PENDING': 1,
    'CONFIRMED': 2,
    'PROCESSING': 2,
    'SHIPPED': 3,
    'DELIVERED': 4,
    'COMPLETED': 4,
    'CANCELLED': -1
};
