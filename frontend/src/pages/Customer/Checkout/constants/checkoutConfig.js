export const CHECKOUT_STEPS = {
    CART: 1,
    PAYMENT: 2,
    SUCCESS: 3
};

export const getTimelineSteps = (t) => [
    { id: 1, label: t('success_timeline_1', 'ĐẶT HÀNG'), status: 'completed' },
    { id: 2, label: t('success_timeline_2', 'ĐÓNG GÓI'), status: 'pending' },
    { id: 3, label: t('success_timeline_3', 'ĐANG GIAO'), status: 'pending' },
    { id: 4, label: t('success_timeline_4', 'ĐÃ NHẬN'), status: 'pending' },
];
