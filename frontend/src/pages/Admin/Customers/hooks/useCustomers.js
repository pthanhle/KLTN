import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback, useRef } from 'react';
import { message } from 'antd';
import { adminCustomerApi } from '@/services/api/adminCustomer.api';
import { MOCK_STATS } from '../data/customers.mock';

const DEFAULT_PAGINATION = { currentPage: 1, pageSize: 10, total: 0 };

export const useCustomers = () => {
    const { t } = useTranslation(['adminCustomers', 'layout']);

    const breadcrumbItems = [
        { label: t('adminCustomers:title', 'Quản lý khách hàng') }
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({});
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filters, setFilters] = useState({ search: '', status: 'all', tier: 'all', dateRange: null });
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const searchTimerRef = useRef(null);

    const fetchCustomers = useCallback(async (page = 1, pageSize = 10, currentFilters = filters) => {
        setIsLoading(true);
        try {
            const params = {
                page,
                limit: pageSize,
                ...(currentFilters.search && { search: currentFilters.search }),
                ...(currentFilters.status !== 'all' && { status: currentFilters.status }),
                ...(currentFilters.tier !== 'all' && { tier: currentFilters.tier }),
                ...(currentFilters.dateRange?.[0] && { startDate: currentFilters.dateRange[0].toISOString() }),
                ...(currentFilters.dateRange?.[1] && { endDate: currentFilters.dateRange[1].toISOString() }),
            };
            const response = await adminCustomerApi.getCustomers(params);
            const resData = response?.data || response;

            setData(resData?.customers || []);
            setPagination({
                currentPage: resData?.pagination?.page || page,
                pageSize: resData?.pagination?.limit || pageSize,
                total: resData?.pagination?.total || 0,
            });
        } catch (err) {
            message.error(t('adminCustomers:fetchError', 'Không thể tải danh sách khách hàng'));
            console.error('Fetch customers error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [filters, t]);

    const fetchStats = useCallback(async () => {
        try {
            const response = await adminCustomerApi.getCustomerStats();
            const resData = response?.data || response;

            setStats({
                total_customers: resData.totalCustomers || 0,
                vip_customers: resData.vipCustomers || 0,
                total_debt: resData.totalDebt || 0,
                new_this_week: resData.newThisWeek || 0,
                total_trend: 12.5,
                vip_trend: 4,
                debt_trend: 0,
                new_trend: -2
            });
        } catch (err) {
            console.error('Fetch stats error:', err);
        }
    }, [t]);

    useEffect(() => {
        fetchCustomers(pagination.currentPage, pagination.pageSize);
        fetchStats();
    }, [refetchTrigger, fetchCustomers, fetchStats]);

    const handlePaginationChange = (page, pageSize) => {
        setPagination(prev => ({ ...prev, currentPage: page, pageSize }));
        fetchCustomers(page, pageSize);
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        if (key === 'search') {
            clearTimeout(searchTimerRef.current);
            searchTimerRef.current = setTimeout(() => {
                fetchCustomers(1, pagination.pageSize, newFilters);
                setPagination(prev => ({ ...prev, currentPage: 1 }));
            }, 500);
        } else {
            fetchCustomers(1, pagination.pageSize, newFilters);
            setPagination(prev => ({ ...prev, currentPage: 1 }));
        }
    };

    const handleSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleClearSelection = () => {
        setSelectedRowKeys([]);
    };

    const handleBulkAction = (actionType) => {
        console.log(`Bulk action ${actionType} on IDs:`, selectedRowKeys);
        setSelectedRowKeys([]);
    };

    const refetch = () => setRefetchTrigger(n => n + 1);

    return {
        t,
        breadcrumbItems,
        data,
        stats,
        pagination,
        isLoading,
        filters,
        selectedRowKeys,
        handleFilterChange,
        handleSelectChange,
        handleClearSelection,
        handleBulkAction,
        handlePaginationChange,
        refetch,
    };
};
