export const S = {
    base: 'font-family:Arial;font-size:12px;',
    border: 'border:1px solid #e2e8f0;',
    pad: 'padding:6px 12px;',
    padSm: 'padding:5px 12px;',
    right: 'text-align:right;',
    center: 'text-align:center;',
    bold: 'font-weight:bold;',
    muted: 'color:#6b7280;',
    accent: 'color:#1d4ed8;',
    rowEven: 'background:#f9fafb;',
    thBg: 'background:#374151;color:#ffffff;font-weight:bold;',
    totalBg: 'background:#f1f5f9;font-weight:bold;',
};

export const STATUS_MAP = {
    PENDING:    { label: 'Chờ duyệt',   color: '#f59e0b' },
    CONFIRMED:  { label: 'Đã xác nhận', color: '#3b82f6' },
    PROCESSING: { label: 'Đang xử lý',  color: '#8b5cf6' },
    SHIPPED:    { label: 'Đang giao',    color: '#06b6d4' },
    DELIVERED:  { label: 'Đã giao',     color: '#10b981' },
    COMPLETED:  { label: 'Hoàn thành',  color: '#22c55e' },
    CANCELLED:  { label: 'Đã hủy',      color: '#ef4444' },
};

export const PERIODS = [
    { key: 'day', label: 'Ngày' },
    { key: 'week', label: 'Tuần' },
    { key: 'month', label: 'Tháng' },
    { key: 'year', label: 'Năm' },
];
