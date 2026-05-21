import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { adminOrderApi } from '@/services/api/adminOrder.api';
import { FILTER_DEFAULT_VALUE } from '../constants/filterOptions';
import { useOrderFilters } from './useOrderFilters';
import { useOrderPagination } from './useOrderPagination';

export const useOrderListLogic = () => {
    const { t } = useTranslation('adminOrders');

    const filterState = useOrderFilters();
    const paginationState = useOrderPagination();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: paginationState.currentPage,
                limit: paginationState.pageSize,
            };

            if (filterState.filterStatus !== FILTER_DEFAULT_VALUE) {
                params.order_status = filterState.filterStatus;
            }

            if (filterState.filterPayment !== FILTER_DEFAULT_VALUE) {
                params.payment_status = filterState.filterPayment;
            }

            if (filterState.searchText) {
                params.search = filterState.searchText;
            }

            const response = await adminOrderApi.getOrders(params);
            setData(response.orders || []);
            setTotal(response.pagination?.total || 0);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            message.error(t('fetch_error', 'Không thể tải danh sách đơn hàng'));
            setData([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [
        paginationState.currentPage,
        paginationState.pageSize,
        filterState.filterStatus,
        filterState.filterPayment,
        filterState.searchText,
        t
    ]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatusChange = (value) => {
        filterState.setFilterStatus(value);
        paginationState.resetPage();
    };

    const handlePaymentChange = (value) => {
        filterState.setFilterPayment(value);
        paginationState.resetPage();
    };

    const handleSearch = (value) => {
        filterState.setSearchText(value);
        paginationState.resetPage();
    };

    return {
        t,
        loading,
        data,
        filterStatus: filterState.filterStatus,
        handleStatusChange,
        filterPayment: filterState.filterPayment,
        handlePaymentChange,
        searchText: filterState.searchText,
        handleSearch,

        handleTableChange: paginationState.handleTableChange,
        pagination: {
            current: paginationState.currentPage,
            pageSize: paginationState.pageSize,
            total,
            showSizeChanger: true,
            showTotal: (total, range) => `${t('pagination_show', 'Hiển thị')} ${range[0]}-${range[1]} ${t('pagination_of', 'của')} ${total} ${t('pagination_items', 'đơn hàng')}`
        }
    };
};
