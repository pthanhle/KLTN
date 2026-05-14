import { GANTT_CONSTANTS } from '../../../constants/ganttConstants';

const START_HOUR = GANTT_CONSTANTS.START_HOUR;
const END_HOUR = GANTT_CONSTANTS.END_HOUR;
const TOTAL_HOURS = END_HOUR - START_HOUR;

export const timeToDecimal = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours - START_HOUR) + (minutes / 60);
};

export const calculateLeftPercentage = (startTime) => {
    const decimalHours = timeToDecimal(startTime);
    const percentage = (decimalHours / TOTAL_HOURS) * 100;
    return `${Math.max(0, Math.min(100, percentage))}%`;
};

export const calculateWidthPercentage = (startTime, endTime) => {
    const startDecimal = timeToDecimal(startTime);
    let endDecimal = timeToDecimal(endTime);
    
    if (endDecimal > TOTAL_HOURS) {
        endDecimal = TOTAL_HOURS;
    }

    const duration = endDecimal - startDecimal;
    const percentage = (duration / TOTAL_HOURS) * 100;
    return `${Math.max(0, percentage)}%`;
};

/**
 * Calculates display boundaries and flags for a potentially multi-day RO block.
 * @param {Object} booking The booking object (can have expected_start_datetime, expected_end_datetime)
 * @param {string} selectedDateStr The currently viewed date 'YYYY-MM-DD'
 * @param {number} currentMins Current time in minutes since 00:00
 * @returns {Object} Boundaries and flags
 */
export const calculateBlockBoundaries = (booking, selectedDateStr, currentMins) => {
    let startStr = '07:00';
    let endStr = '17:00';
    let isContinuedFromYesterday = false;
    let isContinuesToTomorrow = false;
    let isOverdue = false;

    // Fallback parsing if datetimes are not provided
    const defaultStartTime = booking.time_slot ? booking.time_slot.split(' - ')[0] : '07:00';
    const defaultEndTime = booking.time_slot ? (booking.time_slot.split(' - ')[1] || '17:00') : '17:00';

    const renderDate = new Date(selectedDateStr);
    renderDate.setHours(0, 0, 0, 0);

    let startDt, endDt;

    if (booking.expected_start_datetime && booking.expected_end_datetime) {
        startDt = new Date(booking.expected_start_datetime);
        endDt = new Date(booking.expected_end_datetime);
    } else {
        // Construct from booking_date and time_slot
        const bDate = new Date(booking.booking_date);
        startDt = new Date(bDate);
        const [sh, sm] = defaultStartTime.split(':').map(Number);
        startDt.setHours(sh, sm, 0, 0);

        endDt = new Date(bDate);
        const [eh, em] = defaultEndTime.split(':').map(Number);
        endDt.setHours(eh, em, 0, 0);
    }

    const renderStartOfDay = new Date(renderDate);
    const renderEndOfDay = new Date(renderDate);
    renderEndOfDay.setHours(23, 59, 59, 999);

    const startHourStr = `${START_HOUR.toString().padStart(2, '0')}:00`;
    const endHourStr = `${END_HOUR.toString().padStart(2, '0')}:00`;

    // 1. Calculate Start Time for the Grid
    if (startDt < renderStartOfDay) {
        startStr = startHourStr;
        isContinuedFromYesterday = true;
    } else {
        startStr = `${startDt.getHours().toString().padStart(2, '0')}:${startDt.getMinutes().toString().padStart(2, '0')}`;
        // Cap at 07:00
        if (timeToDecimal(startStr) < 0) startStr = startHourStr;
    }

    // 2. Calculate End Time for the Grid
    if (endDt > renderEndOfDay) {
        endStr = endHourStr;
        isContinuesToTomorrow = true;
    } else {
        endStr = `${endDt.getHours().toString().padStart(2, '0')}:${endDt.getMinutes().toString().padStart(2, '0')}`;
        // Cap at 19:00
        if (timeToDecimal(endStr) > TOTAL_HOURS) endStr = endHourStr;
    }

    // 3. Calculate Overdue based on actual End Date Time
    const now = new Date();
    // Only overdue if the task is IN_PROGRESS and we have passed the actual expected end datetime
    if (booking.status === 'IN_PROGRESS' && now > endDt) {
        isOverdue = true;
        // If the task was supposed to end today or earlier, stretch it to NOW (if now is today)
        // If we are looking at a day that is BEFORE "now", and the task should have ended, how does it look?
        // Let's keep it simple: if selectedDate is TODAY, stretch to currentMins.
        const todayStr = now.toISOString().split('T')[0];
        if (selectedDateStr === todayStr) {
            const cappedCurrMins = Math.min(Math.max(currentMins, endDt.getHours() * 60 + endDt.getMinutes()), END_HOUR * 60);
            endStr = `${Math.floor(cappedCurrMins / 60).toString().padStart(2, '0')}:${(cappedCurrMins % 60).toString().padStart(2, '0')}`;
            // If stretched to END_HOUR, does it continue tomorrow? No, just overdue.
        }
    }

    return {
        displayStart: startStr,
        displayEnd: endStr,
        isContinuedFromYesterday,
        isContinuesToTomorrow,
        isOverdue,
        originalEndMins: endDt.getHours() * 60 + endDt.getMinutes()
    };
};
