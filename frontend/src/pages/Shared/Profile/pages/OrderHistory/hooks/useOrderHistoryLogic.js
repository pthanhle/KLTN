import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMyOrders, useCancelOrder, useConfirmReceipt } from '@/services/queries/checkoutQueries';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

export const useOrderHistoryLogic = () => {
    const { t } = useTranslation('profile');
    const queryClient = useQueryClient();

    const cancelMutation = useCancelOrder();
    const confirmMutation = useConfirmReceipt();

    const TABS = useMemo(() => [
        t('order_tab_all', 'Tất cả'),
        t('order_tab_pending', 'Chờ xử lý'),
        t('order_tab_processing', 'Đang xử lý'),
        t('order_tab_shipping', 'Đang giao'),
        t('order_tab_completed', 'Hoàn thành'),
        t('order_tab_cancelled', 'Đã hủy')
    ], [t]);

    const [activeTab, setActiveTab] = useState(TABS[0]);

    const { data, isLoading } = useGetMyOrders({ limit: 100 });
    const allOrders = data?.orders || [];

    const filteredOrders = useMemo(() => {
        if (activeTab === TABS[0]) return allOrders;
        if (activeTab === TABS[1]) return allOrders.filter(o => o.order_status === 'PENDING');
        if (activeTab === TABS[2]) return allOrders.filter(o => ['CONFIRMED', 'PROCESSING', 'PACKED'].includes(o.order_status));
        if (activeTab === TABS[3]) return allOrders.filter(o => o.order_status === 'SHIPPING' || o.order_status === 'SHIPPED');
        if (activeTab === TABS[4]) return allOrders.filter(o => o.order_status === 'COMPLETED' || o.order_status === 'DELIVERED');
        if (activeTab === TABS[5]) return allOrders.filter(o => o.order_status === 'CANCELLED');
        return allOrders;
    }, [allOrders, activeTab, TABS]);

    const handleCancelOrder = (orderId) => {
        if (window.confirm(t('order_cancel_confirm', 'Bạn có chắc chắn muốn hủy đơn hàng này không?'))) {
            cancelMutation.mutate(orderId, {
                onSuccess: () => {
                    message.success(t('order_cancel_success', 'Hủy đơn hàng thành công'));
                    queryClient.invalidateQueries(['myOrders']);
                },
                onError: (error) => {
                    message.error(error.response?.data?.message || t('order_cancel_failed', 'Có lỗi xảy ra khi hủy đơn'));
                }
            });
        }
    };

    const handleConfirmReceipt = (orderId) => {
        if (window.confirm(t('order_confirm_receipt_prompt', 'Xác nhận bạn đã nhận được hàng và hài lòng với sản phẩm?'))) {
            confirmMutation.mutate(orderId, {
                onSuccess: () => {
                    message.success(t('order_confirm_success', 'Đã xác nhận nhận hàng'));
                    queryClient.invalidateQueries(['myOrders']);
                },
                onError: (error) => {
                    message.error(error.response?.data?.message || t('order_confirm_failed', 'Có lỗi xảy ra'));
                }
            });
        }
    };

    return {
        t,
        TABS,
        activeTab,
        setActiveTab,
        filteredOrders,
        isLoading,
        handleCancelOrder,
        handleConfirmReceipt
    };
};
