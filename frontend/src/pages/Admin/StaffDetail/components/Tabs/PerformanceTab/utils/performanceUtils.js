/**
 * Format currency to short string (e.g. 120000000 -> 120M)
 * @param {number} val - Amount in currency
 * @returns {string} - Short string formatted
 */
export const formatMillions = (val) => {
    if (!val) return '0M';
    return (val / 1000000).toFixed(0) + 'M';
};

/**
 * Calculate progress percentage safely
 * @param {number} current 
 * @param {number} target 
 * @returns {number} percentage 0-100
 */
export const calculatePercentage = (current, target) => {
    if (!target || target <= 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
};

import { TASK_PRIORITY } from '../constants/performanceConstants';

/**
 * Get Tailwind styling classes based on Task Priority
 * @param {string} priority 
 * @returns {string} Tailwind classes
 */
export const getPriorityStyles = (priority) => {
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
