import { GANTT_CONSTANTS } from '../../../constants/ganttConstants';

// Time range uses constants
const START_HOUR = GANTT_CONSTANTS.START_HOUR;
const END_HOUR = GANTT_CONSTANTS.END_HOUR;
const TOTAL_HOURS = END_HOUR - START_HOUR;

/**
 * Parses "09:00" into a decimal hours relative to START_HOUR.
 * Example: "09:30" -> 1.5
 */
export const timeToDecimal = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours - START_HOUR) + (minutes / 60);
};

/**
 * Calculates the left percentage for absolute positioning in the Gantt grid.
 * @param {string} startTime "09:30"
 * @returns {string} "16.666%"
 */
export const calculateLeftPercentage = (startTime) => {
    const decimalHours = timeToDecimal(startTime);
    const percentage = (decimalHours / TOTAL_HOURS) * 100;
    // Cap at 0 and 100 to prevent overflow
    return `${Math.max(0, Math.min(100, percentage))}%`;
};

/**
 * Calculates the width percentage for absolute positioning.
 * @param {string} startTime "09:00"
 * @param {string} endTime "11:30"
 * @returns {string} "27.777%"
 */
export const calculateWidthPercentage = (startTime, endTime) => {
    const startDecimal = timeToDecimal(startTime);
    let endDecimal = timeToDecimal(endTime);
    
    // Safety check for end time past 17:00
    if (endDecimal > TOTAL_HOURS) {
        endDecimal = TOTAL_HOURS;
    }

    const duration = endDecimal - startDecimal;
    const percentage = (duration / TOTAL_HOURS) * 100;
    return `${Math.max(0, percentage)}%`;
};
