import { getOrderStatusConfig } from '../../../../../../utils/statusHelpers';

export const useOrderCard = (order, t) => {
    const statusConfig = getOrderStatusConfig(order.order_status, t);
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const isPending = order.order_status === 'PENDING';
    const isShipping = order.order_status === 'SHIPPING';
    const isPaid = order.payment_status === 'PAID';
    const isUnpaid = order.payment_status === 'UNPAID';

    return {
        statusConfig,
        formatCurrency,
        isPending,
        isShipping,
        isPaid,
        isUnpaid
    };
};
