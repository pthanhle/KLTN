export const getMockCarDetail = (id) => ({
    id: id || '1',
    name: 'MERCEDES-BENZ G63 AMG',
    heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop',
    price: 11750000000,
    engine: 'V8 Biturbo',
    power: '585 HP',
    tagline: 'Experience the legend of luxury performance.'
});

export const TIME_SLOTS = ['08:00', '10:00', '14:00', '16:00'];

export const SHOWROOM_BRANCHES = [
    { id: '1', name: 'TT AUTO - Quận 1, TP. HCM' },
    { id: '2', name: 'TT AUTO - Cầu Giấy, Hà Nội' },
    { id: '3', name: 'TT AUTO - Hải Châu, Đà Nẵng' }
];
