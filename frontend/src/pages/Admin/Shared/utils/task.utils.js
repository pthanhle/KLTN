import { TASK_PRIORITY } from '../constants/task.constants';

/**
 * Get Tailwind styling classes based on Task Priority
 * @param {string} priority 
 * @returns {string} Tailwind classes
 */
export const getSharedPriorityStyles = (priority) => {
    switch (priority) {
        case TASK_PRIORITY.URGENT:
            return 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500 border-rose-200 dark:border-rose-500/20';
        case TASK_PRIORITY.HIGH:
            return 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500 border-orange-200 dark:border-orange-500/20';
        case TASK_PRIORITY.MEDIUM:
            return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
        case TASK_PRIORITY.LOW:
            return 'bg-slate-50 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';
        default:
            return 'bg-slate-50 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';
    }
};

/**
 * Format SLA string with translations
 * @param {string} sla 
 * @param {function} t 
 * @returns {string} Formatted SLA
 */
export const formatTaskSla = (sla, t) => {
    if (!sla) return '';
    if (sla === 'Ongoing') return t('adminStaffDetail:sla_ongoing', 'Đang xử lý');
    if (sla === 'Overdue') return t('adminStaffDetail:sla_overdue', 'Quá hạn');
    if (sla.includes('Remaining')) return sla.replace('Remaining', t('adminStaffDetail:sla_remaining', 'còn lại'));
    return sla;
};
