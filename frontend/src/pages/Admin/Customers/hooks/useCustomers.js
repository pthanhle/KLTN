import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { MOCK_CUSTOMERS, MOCK_PAGINATION, MOCK_STATS } from '../data/customers.mock';

export const useCustomers = () => {
    const { t } = useTranslation(['adminCustomers', 'layout']);

    const breadcrumbItems = [
        { label: t('adminCustomers:title', 'Quản lý khách hàng') }
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [stats, setStats] = useState(MOCK_STATS);
    const [pagination, setPagination] = useState(MOCK_PAGINATION);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const fetchCustomers = () => {
            setIsLoading(true);
            setTimeout(() => {
                setData(MOCK_CUSTOMERS);
                setPagination(MOCK_PAGINATION);
                setStats(MOCK_STATS);
                setIsLoading(false);
            }, 800);
        };

        fetchCustomers();
    }, []);

    const handlePaginationChange = (page, pageSize) => {
        setPagination({ ...pagination, currentPage: page, pageSize });
    };

    const handleSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleClearSelection = () => {
        setSelectedRowKeys([]);
    };

    const handleBulkAction = (actionType) => {
        console.log(`Bulk action ${actionType} on IDs:`, selectedRowKeys);
        alert(`Đã nhận lệnh [${actionType}] với ${selectedRowKeys.length} khách`);
        setSelectedRowKeys([]);
    };

    return {
        t,
        breadcrumbItems,
        data,
        stats,
        pagination,
        isLoading,
        selectedRowKeys,
        handleSelectChange,
        handleClearSelection,
        handleBulkAction,
        handlePaginationChange
    };
};
