import { NOTIFICATION_TYPES, NOTIFICATION_STATUS } from '../constants/notification.constants';

// Dữ liệu mô phỏng API chuẩn ReSTful cho tính năng Thông báo (Notification)
// KHÔNG hardcode số liệu tĩnh vào UI. Mọi field đều map chuẩn 1:1 với Schema DB.

export const MOCK_NOTIFICATIONS = [
    {
        id: 'NOTIF-001',
        type: NOTIFICATION_TYPES.QUOTATION_WAITED,
        title: 'Báo giá bổ sung cần phê duyệt',
        message: 'Xe Range Rover (SRV-2026-B77P) phát sinh thay thế đĩa phanh. Vui lòng kiểm tra báo giá.',
        is_read: NOTIFICATION_STATUS.UNREAD,
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
        reference_id: 'SRV-2026-B77P',
        reference_link: '/profile/services/SRV-2026-B77P'
    },
    {
        id: 'NOTIF-002',
        type: NOTIFICATION_TYPES.SYSTEM_ALERT,
        title: 'Đặt lịch bảo dưỡng thành công',
        message: 'Lịch bảo dưỡng cho xe Mercedes S450 lúc 14:00 ngày mai đã được xác nhận. Vui lòng đến đúng giờ.',
        is_read: NOTIFICATION_STATUS.READ,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        reference_id: 'BOOK-S450-99',
        reference_link: '/profile/services'
    },
    {
        id: 'NOTIF-003',
        type: NOTIFICATION_TYPES.PROMOTION,
        title: 'Voucher giảm 50% tiền công',
        message: 'Chúc mừng sinh nhật tháng 3! TT AUTO tặng bạn Voucher giảm giá 50% tiền công sửa chữa.',
        is_read: NOTIFICATION_STATUS.READ,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
        reference_id: 'VOUCHER-50',
        reference_link: '/profile/vouchers'
    }
];

// Hàm giả lập API (Fake API Fetcher) dùng chung trong Custom Hook
export const fetchNotificationsAPI = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                success: true,
                data: MOCK_NOTIFICATIONS
            });
        }, 1200); // 1.2s delay to show Premium Skeleton Loading
    });
};

export const markAllAsReadAPI = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 200, success: true });
        }, 500);
    });
};
