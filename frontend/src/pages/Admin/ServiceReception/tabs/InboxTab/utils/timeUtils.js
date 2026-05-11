import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Calculates the aging duration from a given created_at timestamp.
 * Returns an object with the display string (e.g., '45m', '2h', '1d')
 * and a boolean indicating if it's considered 'critical' (e.g., > 30 minutes).
 *
 * @param {string} createdAt - The creation timestamp in ISO format
 * @param {number} criticalThresholdMinutes - The threshold in minutes to consider critical (default: 30)
 * @returns {{ display: string, isCritical: boolean, minutes: number }}
 */
export const calculateAging = (createdAt, criticalThresholdMinutes = 30) => {
    if (!createdAt) return { display: '0m', isCritical: false, minutes: 0 };

    const now = dayjs();
    const createdDate = dayjs(createdAt);
    
    const diffMinutes = now.diff(createdDate, 'minute');
    const isCritical = diffMinutes >= criticalThresholdMinutes;

    let display = '';
    if (diffMinutes < 60) {
        display = `${diffMinutes}m`;
    } else if (diffMinutes < 24 * 60) {
        const hours = Math.floor(diffMinutes / 60);
        display = `${hours}h`;
    } else {
        const days = Math.floor(diffMinutes / (24 * 60));
        display = `${days}d`;
    }

    return { display, isCritical, minutes: diffMinutes };
};
