import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

export const formatRelativeTime = (dateStr) => {
    return dayjs(dateStr).locale('vi').fromNow();
};

export const checkOverdueSLA = (dateStr, status) => {
    if (status !== 'PENDING') return false;
    const orderDate = dayjs(dateStr);
    const now = dayjs();
    const diffHours = now.diff(orderDate, 'hour');
    return diffHours > 24;
};
