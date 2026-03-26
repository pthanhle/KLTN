/**
 * Custom Time Formatter (Vanilla JS)
 * Chuyển đổi định dạng ISO Time thành Relative Time chuỗi thông báo (VD: "5 phút trước")
 * @param {string} dateString - Thời gian dạng ISO (VD: "2026-03-22T08:15:00Z")
 * @returns {string} - Thời gian tương đối
 */
export const getRelativeTime = (dateString, t) => {
    if (!dateString) return '';
    
    const timestamp = new Date(dateString).getTime();
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);

    if (diffInMinutes < 1) return t('notifications.time.just_now', 'Vừa xong');
    if (diffInMinutes < 60) return t('notifications.time.minutes_ago', { count: diffInMinutes, defaultValue: `${diffInMinutes} phút trước`});
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return t('notifications.time.hours_ago', { count: diffInHours, defaultValue: `${diffInHours} giờ trước`});
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return t('notifications.time.days_ago', { count: diffInDays, defaultValue: `${diffInDays} ngày trước`});
    return new Date(dateString).toLocaleDateString('vi-VN');
};
