export const PAYMENT_STATUSES = {
    PENDING: 'PENDING',
    PAID: 'PAID',
    FAILED: 'FAILED'
};

export const CHECKLIST_ITEMS = [
    { id: 'c1', label_key: 'del_check_parts', default_label: 'Đã nhận lại phụ tùng cũ (Nếu có)' },
    { id: 'c2', label_key: 'del_check_exterior', default_label: 'Xác nhận xe không xước xát thêm' },
    { id: 'c3', label_key: 'del_check_belongings', default_label: 'Đã kiểm tra tài sản cá nhân trong xe' }
];

export const PAYMENT_METHODS = {
    VIETQR: 'VietQR',
    APPLE_PAY: 'Apple Pay / Thẻ Tín Dụng'
};
