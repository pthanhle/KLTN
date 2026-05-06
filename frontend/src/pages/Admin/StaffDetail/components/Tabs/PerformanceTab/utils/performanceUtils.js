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
        case TASK_PRIORITY.HIGH:
            return 'bg-red-500/10 text-red-500 border-red-500/20';
        case TASK_PRIORITY.MEDIUM:
            return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20';
        case TASK_PRIORITY.LOW:
            return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        default:
            return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
};
