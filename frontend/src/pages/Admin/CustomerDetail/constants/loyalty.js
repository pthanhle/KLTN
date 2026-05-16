export const LLOYALTY_TIERS = {
    'BRONZE':   { id: 'BRONZE',   name: 'Bronze',   minPoints: 0,       multiplier: 1.0, next: 'SILVER' },
    'SILVER':   { id: 'SILVER',   name: 'Silver',   minPoints: 5000,    multiplier: 1.2, next: 'GOLD' },
    'GOLD':     { id: 'GOLD',     name: 'Gold',     minPoints: 15000,   multiplier: 1.5, next: 'PLATINUM' },
    'PLATINUM': { id: 'PLATINUM', name: 'Platinum', minPoints: 50000,   multiplier: 2.0, next: 'DIAMOND' },
    'DIAMOND':  { id: 'DIAMOND',  name: 'Diamond',  minPoints: 150000,  multiplier: 2.5, next: 'TITANIUM' },
    'TITANIUM': { id: 'TITANIUM', name: 'Titanium', minPoints: 500000,  multiplier: 3.0, next: null },
};

export const getTierArray = () => Object.values(LLOYALTY_TIERS).sort((a, b) => a.minPoints - b.minPoints);

export const getTierByPoints = (points) => {
    const tiers = getTierArray().reverse();
    return tiers.find(t => points >= t.minPoints) || LLOYALTY_TIERS.BRONZE;
};
