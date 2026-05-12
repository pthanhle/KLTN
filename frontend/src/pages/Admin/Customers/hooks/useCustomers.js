import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback, useRef } from 'react';
import { message } from 'antd';
import { adminCustomerApi } from '../../../../services/api/adminCustomer.api';
import { MOCK_STATS } from '../data/customers.mock';

const DEFAULT_PAGINATION = { currentPage: 1, pageSize: 10, total: 0 };

export const useCustomers = () => {
    const { t } = useTranslation(['adminCustomers', 'layout']);

    const breadcrumbItems = [
        { label: t('adminCustomers:title', 'Quản lý khách hàng') }
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [stats, setStats] = useState(MOCK_STATS);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filters, setFilters] = useState({ search: '', status: 'all', tier: 'all' });
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

    useEffect(() => {
        fetchCustomers(pagination.currentPage, pagination.pageSize);
    }, [refetchTrigger]);

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
