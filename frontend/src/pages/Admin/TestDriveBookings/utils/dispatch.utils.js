import { WORKLOAD_THRESHOLDS, WORKLOAD_THEMES, PRIORITY_THEMES, TASK_PRIORITIES, BOOKING_TYPE_THEMES } from '../constants/dispatch.constants';

export const getWorkloadTheme = (count) => {
    if (count === WORKLOAD_THRESHOLDS.EMPTY) return WORKLOAD_THEMES.EMPTY;
    if (count > WORKLOAD_THRESHOLDS.OVERLOADED) return WORKLOAD_THEMES.OVERLOADED;
    if (count >= WORKLOAD_THRESHOLDS.MODERATE) return WORKLOAD_THEMES.MODERATE;
    return WORKLOAD_THEMES.NORMAL;
};

export const getPriorityTheme = (priority) => {
    return PRIORITY_THEMES[priority] || PRIORITY_THEMES[TASK_PRIORITIES.LOW];
};

export const getBookingTypeTheme = (isHome) => {
    return isHome ? BOOKING_TYPE_THEMES.HOME : BOOKING_TYPE_THEMES.SHOWROOM;
};

export const isTaskOverdue = (sla, priority) => {
    if (!sla) return false;
    return sla === 'Overdue' || sla.includes('m') || priority === TASK_PRIORITIES.HIGH;
};

export const calculateInitialPriority = (booking) => {
    if (!booking) return TASK_PRIORITIES.MEDIUM;
    
    if (booking.note && booking.note.toLowerCase().includes('vip')) {
        return TASK_PRIORITIES.URGENT;
    }
    if (booking.bookingType === 'home') {
        return TASK_PRIORITIES.HIGH;
    }
    return TASK_PRIORITIES.MEDIUM;
};
