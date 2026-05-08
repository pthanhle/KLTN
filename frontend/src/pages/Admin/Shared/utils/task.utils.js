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
