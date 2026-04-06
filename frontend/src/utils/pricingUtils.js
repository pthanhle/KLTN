/**
 * Utility functions for computing pricing metrics
 */

export const calculateDiscountPercent = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= 0) return 0;
    if (!currentPrice || currentPrice >= originalPrice) return 0;
    
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
