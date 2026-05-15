import { LLOYALTY_TIERS } from '../../../../constants/loyalty';

export const useLoyalty = (loyaltyData) => {
    if (!loyaltyData) {
        return {
            currentPoints: 0,
            accumulatedPoints: 0,
            requiredPoints: 5000,
            progressPercent: 0,
            nextTier: 'SILVER',
            activeVouchers: 0,
            bonusRate: 0
        };
    }

    const spendablePoints = loyaltyData.points || 0;
    const accumulatedPoints = loyaltyData.accumulated_points || 0;

    const tier = loyaltyData.tier || 'BRONZE';
    const currentConfig = LLOYALTY_TIERS[tier] || LLOYALTY_TIERS['BRONZE'];

    const nextTierKey = currentConfig.next;
    const nextConfig = nextTierKey ? LLOYALTY_TIERS[nextTierKey] : null;

    const nextThreshold = nextConfig ? nextConfig.minPoints : currentConfig.minPoints;
    const prevThreshold = currentConfig.minPoints;

    const requiredPoints = nextThreshold > accumulatedPoints ? nextThreshold - accumulatedPoints : 0;

    const range = nextThreshold - prevThreshold;
    const progressInRange = accumulatedPoints - prevThreshold;
    const progressPercent = range > 0
        ? Math.min(Math.max((progressInRange / range) * 100, 0), 100)
        : 100;

    return {
        currentPoints: spendablePoints,
        accumulatedPoints,
        requiredPoints,
        progressPercent,
        nextTier: nextTierKey || 'MAX',
        activeVouchers: loyaltyData.active_vouchers || 0,
        bonusRate: Math.round((currentConfig.multiplier - 1) * 100)
    };
};
