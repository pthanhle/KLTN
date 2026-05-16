export const FILTER_DEFAULT_VALUE = 'ALL';

export const ORDER_STATUS_OPTIONS = [
    { value: 'PENDING', labelKey: 'tab_pending' },
    { value: 'CONFIRMED', labelKey: 'tab_confirmed' },
    { value: 'SHIPPING', labelKey: 'tab_shipping' },
    { value: 'COMPLETED', labelKey: 'tab_completed' },
    { value: 'CANCELLED', labelKey: 'tab_cancelled' }
];

export const PAYMENT_STATUS_OPTIONS = [
    { value: 'PAID', labelKey: 'badge_paid' },
    { value: 'UNPAID', labelKey: 'badge_unpaid' },
    { value: 'REFUNDED', labelKey: 'badge_refunded' }
];
