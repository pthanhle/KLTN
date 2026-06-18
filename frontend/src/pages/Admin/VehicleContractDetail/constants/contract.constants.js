export const STATUS_ENUM = {
    DRAFT: 'draft',
    ISSUED: 'issued',
    SIGNED: 'signed',
    CANCELLED: 'cancelled'
};

export const CANCEL_REASONS = [
    { value: 'customer_cancel', label: 'Khách hàng đổi ý' },
    { value: 'bank_reject', label: 'Ngân hàng từ chối cho vay' },
    { value: 'stock_issue', label: 'Lỗi xe / Thiếu hụt kho' },
    { value: 'other', label: 'Lý do khác' }
];
