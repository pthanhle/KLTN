/**
 * Format currency to VND
 * @param {number} amount 
 * @returns {string} Formatted string
 */
export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

/**
 * Format date to standard string
 * @param {string} dateString 
 * @returns {string} Formatted string
 */
export const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};
