import { useState, useMemo, useEffect } from 'react';
import { mockOrders } from '../data/mockOrderData';
import { useTranslation } from 'react-i18next';

export const useOrderHistoryLogic = () => {
    const { t } = useTranslation('profile');

    // TABS setup
    const TABS = useMemo(() => [
        t('order_tab_all', 'Tất cả'),
        t('order_tab_pending', 'Chờ xử lý'),
        t('order_tab_shipping', 'Đang giao'),
        t('order_tab_completed', 'Hoàn thành'),
        t('order_tab_cancelled', 'Đã hủy')
    ], [t]);

    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const filteredOrders = useMemo(() => {
        return mockOrders.filter(order => {
            if (activeTab === TABS[0]) return true;
            if (activeTab === TABS[1]) return order.order_status === 'PENDING';
            if (activeTab === TABS[2]) return order.order_status === 'SHIPPING';
            if (activeTab === TABS[3]) return order.order_status === 'COMPLETED';
            if (activeTab === TABS[4]) return order.order_status === 'CANCELLED';
            return true;
        });
    }, [activeTab, TABS]);

    return {
        t,
        TABS,
        activeTab,
        setActiveTab,
        filteredOrders,
        isLoading
    };
};
