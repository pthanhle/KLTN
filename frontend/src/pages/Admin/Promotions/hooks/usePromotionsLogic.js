import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { mockPromotionsData, mockPromotionsStats } from '../data/promotions.mock';
import { PROMOTION_STATUS, PROMOTION_CATEGORY } from '../constants/promotions.constants';

export const usePromotionsLogic = () => {
    const { t } = useTranslation('adminPromotions');
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState(PROMOTION_STATUS.ALL);
    const [filterType, setFilterType] = useState('ALL');
    const [filterLoyalty, setFilterLoyalty] = useState(PROMOTION_CATEGORY.ALL);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(mockPromotionsData);
    const stats = mockPromotionsStats;

    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
        setCurrentPage(1);
    };

    const handleStatusChange = (value) => {
        setFilterStatus(value);
        setCurrentPage(1);
    };

    const handleTypeChange = (value) => {
        setFilterType(value);
        setCurrentPage(1);
    };

    const handleLoyaltyChange = (value) => {
        setFilterLoyalty(value);
        setCurrentPage(1);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleToggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === PROMOTION_STATUS.ACTIVE ? PROMOTION_STATUS.INACTIVE : PROMOTION_STATUS.ACTIVE;
        setData(prevData => prevData.map(item => item._id === id ? { ...item, status: newStatus } : item));
        message.success(t('msg_status_changed'));
    };

    const handleDelete = (id) => {
        setData(prevData => prevData.filter(item => item._id !== id));
        message.success('Đã xóa chiến dịch');
    };

    // FILTER LOGIC
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchSearch = item.title.toLowerCase().includes(searchText);
            const matchStatus = filterStatus === PROMOTION_STATUS.ALL || item.status === filterStatus;
            const matchType = filterType === 'ALL' || item.discount_type === filterType;

            let matchLoyalty = true;
            if (filterLoyalty === PROMOTION_CATEGORY.LOYALTY) matchLoyalty = item.is_loyalty === true;
            if (filterLoyalty === PROMOTION_CATEGORY.GLOBAL) matchLoyalty = item.is_loyalty === false;

            return matchSearch && matchStatus && matchType && matchLoyalty;
        });
    }, [data, searchText, filterStatus, filterType, filterLoyalty]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage, pageSize]);

    return {
        t,
        stats,
        data: paginatedData,
        loading,
        searchText,
        handleSearch,
        filterStatus,
        handleStatusChange,
        filterType,
        handleTypeChange,
        filterLoyalty,
        handleLoyaltyChange,
        handleToggleStatus,
        handleDelete,
        handleTableChange,
        pagination: {
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
            showSizeChanger: true
        }
    };
};
