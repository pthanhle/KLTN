import { useState, useEffect } from 'react';
import { getMockOrderDetail } from '../data/mockOrderDetail';
import { getOrderStatusConfig } from '../../../../../../utils/statusHelpers';
import { useTranslation } from 'react-i18next';
import { ClipboardList, ShieldCheck, Truck, Package } from 'lucide-react';

export const useOrderDetailLogic = (orderId) => {
    const { t } = useTranslation('profile');
    const [orderDetail, setOrderDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setOrderDetail(getMockOrderDetail(orderId));
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [orderId]);

    const statusConfig = orderDetail ? getOrderStatusConfig(orderDetail.status, t) : {};

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const steps = [
        { key: 'PENDING', label: t('order_step_placed', 'Đã Đặt Hàng'), time: 'Oct 24, 14:32', icon: ClipboardList },
        { key: 'CONFIRMED', label: t('order_step_confirmed', 'Đã Xác Nhận'), time: 'Oct 24, 14:45', icon: ShieldCheck },
        { key: 'SHIPPING', label: t('order_step_transit', 'Đang Giao Hàng'), time: t('order_step_arriving', 'Sắp giao'), icon: Truck },
        { key: 'DELIVERED', label: t('order_step_delivered', 'Đã Giao Vận'), time: t('order_step_est', 'Dự kiến 2-3 ngày'), icon: Package },
    ];

    const getStatusIndex = (stt) => {
        if (stt === 'PENDING') return 0;
        if (stt === 'CONFIRMED') return 1;
        if (stt === 'SHIPPING') return 2;
        if (stt === 'DELIVERED' || stt === 'COMPLETED') return 3;
        return 0;
    };

    const currentStepIndex = orderDetail ? getStatusIndex(orderDetail.status) : 0;

    const isPending = orderDetail?.status === 'PENDING';
    const isCompleted = orderDetail?.status === 'COMPLETED' || orderDetail?.status === 'DELIVERED';
    const isShipping = orderDetail?.status === 'SHIPPING';
    const isCancelled = orderDetail?.status === 'CANCELLED';

    const handleCancelOrder = () => console.log('Huỷ đơn');
    const handleConfirmReceipt = () => console.log('Đã nhận hàng');
    const handleReview = (itemId) => console.log('Đánh giá', itemId);

    return {
        t,
        orderDetail,
        statusConfig,
        formatCurrency,
        handleCopy,
        steps,
        currentStepIndex,
        isPending,
        isCompleted,
        isShipping,
        isCancelled,
        handleCancelOrder,
        handleConfirmReceipt,
        handleReview,
        isLoading
    };
};
