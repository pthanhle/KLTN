export const useLoyalty = (loyaltyData) => {
    if (!loyaltyData) {
        return {
            currentPoints: 0,
            requiredPoints: 1000,
            totalPoints: 1000,
            progressPercent: 0,
            nextTier: 'Silver',
            activeVouchers: 0,
            bonusRate: 0
        };
    }

    const currentPoints = loyaltyData.current_points || 0;
    const requiredPoints = loyaltyData.points_to_next || 1000;
    const totalPoints = currentPoints + requiredPoints;
    const progressPercent = totalPoints > 0 ? (currentPoints / totalPoints) * 100 : 0;
    
    return {
        currentPoints,
        requiredPoints,
        totalPoints,
        progressPercent,
        nextTier: loyaltyData.next_tier || 'Silver',
        activeVouchers: loyaltyData.active_vouchers || 0,
        bonusRate: loyaltyData.bonus_rate || 0
    };
};
