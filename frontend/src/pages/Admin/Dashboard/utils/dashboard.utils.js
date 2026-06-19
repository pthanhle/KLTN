import { ORDER_STATUS_MAP } from '../constants/dashboard.constants';

/**
 * Transforms raw order status counts into chart-ready data
 * @param {Object} data - Raw status count object { PENDING: 5, COMPLETED: 10 }
 * @param {Function} t - Translation function
 * @returns {Array} Array of objects formatted for Recharts
 */
export const transformOrderStatusData = (data, t) => {
    if (!data) return [];
    return Object.entries(data)
        .filter(([, v]) => v > 0)
        .map(([key, value]) => ({
            name: ORDER_STATUS_MAP[key] ? t(ORDER_STATUS_MAP[key].labelKey) : key,
            value,
            fill: ORDER_STATUS_MAP[key]?.color || '#94a3b8',
        }));
};

/**
 * Transforms daily revenue data into chart-ready format
 * @param {Array} dailyRevenue - Raw array of daily revenue objects
 * @returns {Array} Formatted array for Recharts
 */
export const transformDailyRevenueData = (dailyRevenue) => {
    if (!dailyRevenue || !Array.isArray(dailyRevenue)) return [];
    
    return dailyRevenue.map(item => {
        // Assume _id is 'YYYY-MM-DD'
        const parts = item._id ? item._id.split('-') : [];
        const label = parts.length === 3 ? `${parts[2]}/${parts[1]}` : item._id;
        
        return {
            name: label,
            revenue: item.revenue || 0
        };
    });
};
