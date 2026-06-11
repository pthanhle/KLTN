import { getOrderStatusConfig } from '../../../../../../utils/statusHelpers';

export const useOrderCard = (order, t) => {
    const statusConfig = getOrderStatusConfig(order.order_status, t);
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const isPending = order.order_status === 'PENDING';
    const isShipping = order.order_status === 'SHIPPING' || order.order_status === 'SHIPPED';
    const isPaid = order.payment?.status === 'PAID';
    const isUnpaid = order.payment?.status === 'UNPAID';

    return {
        statusConfig,
        formatCurrency,
        isPending,
        isShipping,
        isPaid,
        isUnpaid
    };
};
