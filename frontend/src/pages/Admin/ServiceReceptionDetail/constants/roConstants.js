export const SYSTEM_HEALTH_COLORS = {
    healthy: {
        bg: 'bg-emerald-50 dark:bg-[#1a1a1c]',
        border: 'border-emerald-200 dark:border-emerald-500/20',
        dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
    },
    warning: {
        bg: 'bg-amber-50 dark:bg-[#1a1a1c]',
        border: 'border-amber-200 dark:border-amber-500/20',
        dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
    },
    critical: {
        bg: 'bg-rose-50 dark:bg-[#1a1a1c]',
        border: 'border-rose-200 dark:border-rose-500/20',
        dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
    }
};

export const QUOTATION_STATUS_STYLES = {
    APPROVED: {
        bg: 'bg-emerald-50 dark:bg-[#1a1a1c]',
        border: 'border-emerald-200 dark:border-emerald-500/20',
        glow: 'bg-emerald-400/10 group-hover:bg-emerald-400/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        icon: 'text-emerald-500'
    },
    WAITING_FOR_APPROVAL: {
        bg: 'bg-amber-50 dark:bg-[#1a1a1c]',
        border: 'border-amber-200 dark:border-amber-500/20',
        glow: 'bg-amber-400/10 group-hover:bg-amber-400/20',
        text: 'text-amber-600 dark:text-amber-400',
        icon: 'text-amber-500'
    },
    PENDING: {
        bg: 'bg-amber-50 dark:bg-[#1a1a1c]',
        border: 'border-amber-200 dark:border-amber-500/20',
        glow: 'bg-amber-400/10 group-hover:bg-amber-400/20',
        text: 'text-amber-600 dark:text-amber-400',
        icon: 'text-amber-500'
    },
    DEFAULT: {
        bg: 'bg-slate-50 dark:bg-[#1a1a1c]',
        border: 'border-slate-200 dark:border-white/10',
        glow: 'bg-slate-400/10 group-hover:bg-slate-400/20',
        text: 'text-slate-700 dark:text-[#dce1fb]',
        icon: 'text-slate-500'
    }
};
