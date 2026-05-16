export const SHIPPING_METHODS_CONFIG = {
    'Tiết kiệm': {
        id: 'ECONOMY',
        isPriority: false,
        allowedProviders: ['GHTK', 'VTP', 'JT'],
        slaHours: 48 // Admin has 48h to ship
    },
    'Tiêu chuẩn': {
        id: 'STANDARD',
        isPriority: false,
        allowedProviders: ['GHTK', 'VTP', 'JT', 'TT'],
        slaHours: 24
    },
    'Hỏa tốc': {
        id: 'EXPRESS',
        isPriority: true,
        allowedProviders: ['TT'], // Only special delivery for express
        slaHours: 2 // Must ship within 2 hours
    }
};

export const getShippingMethodConfig = (methodName) => {
    if (!methodName) return null;
    const key = Object.keys(SHIPPING_METHODS_CONFIG).find(k =>
        methodName.toLowerCase().includes(k.toLowerCase())
    );
    return key ? SHIPPING_METHODS_CONFIG[key] : null;
};
