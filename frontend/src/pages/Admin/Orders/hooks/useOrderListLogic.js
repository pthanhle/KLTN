import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { mockOrders } from '../data/mockOrders';
import { FILTER_DEFAULT_VALUE } from '../constants/filterOptions';
import { useOrderFilters } from './useOrderFilters';
import { useOrderPagination } from './useOrderPagination';

export const useOrderListLogic = () => {
    const { t } = useTranslation('adminOrders');

    const filterState = useOrderFilters();
    const paginationState = useOrderPagination();
    const [loading, setLoading] = useState(true);

    const filteredData = useMemo(() => {
        let result = [...mockOrders];

        // Lọc trạng thái
        if (filterState.filterStatus !== FILTER_DEFAULT_VALUE) {
            result = result.filter(order => order.order_status === filterState.filterStatus);
        }

        // Lọc thanh toán
        if (filterState.filterPayment !== FILTER_DEFAULT_VALUE) {
            result = result.filter(order => order.payment?.status === filterState.filterPayment);
        }

        // Tìm kiếm Text
        if (filterState.searchText) {
            const lowerSearch = filterState.searchText.toLowerCase();
            result = result.filter(order =>
                order.order_code.toLowerCase().includes(lowerSearch) ||
                order.delivery?.phone.includes(lowerSearch) ||
                order.delivery?.receiver_name.toLowerCase().includes(lowerSearch)
            );
        }

        result.sort(() => -1); // Sort demo (Mới nhất)
        return result;
    }, [filterState.filterStatus, filterState.filterPayment, filterState.searchText]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const handleStatusChange = (value) => {
        setLoading(true);
        filterState.setFilterStatus(value);
        paginationState.resetPage();
        setTimeout(() => setLoading(false), 400);
    };

    const handlePaymentChange = (value) => {
        setLoading(true);
        filterState.setFilterPayment(value);
        paginationState.resetPage();
        setTimeout(() => setLoading(false), 400);
    };

    const handleSearch = (value) => {
        setLoading(true);
        filterState.setSearchText(value);
        paginationState.resetPage();
        setTimeout(() => setLoading(false), 400);
    };

    // 4. Return cấu trúc Object cho UI
    return {
        t,
        loading,
        data: filteredData,

        // Filter Props
        filterStatus: filterState.filterStatus,
        handleStatusChange,
        filterPayment: filterState.filterPayment,
        handlePaymentChange,
        searchText: filterState.searchText,
        handleSearch,

        // Table & Pagination Props
        handleTableChange: paginationState.handleTableChange,
        pagination: {
            current: paginationState.currentPage,
            pageSize: paginationState.pageSize,
            total: filteredData.length,
            showSizeChanger: true,
            showTotal: (total, range) => `${t('pagination_show', 'Hiển thị')} ${range[0]}-${range[1]} ${t('pagination_of', 'của')} ${total} ${t('pagination_items', 'đơn hàng')}`
        }
    };
};
