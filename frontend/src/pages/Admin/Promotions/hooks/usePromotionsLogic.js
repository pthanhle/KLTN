import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import {
    useAdminPromotionsQuery,
    useAdminPromotionStatsQuery,
    useAdminPromotionMutations,
} from '../../../../services/queries/promotion.queries';
import { PROMOTION_STATUS, PROMOTION_CATEGORY } from '../constants/promotions.constants';

export const usePromotionsLogic = () => {
    const { t } = useTranslation('adminPromotions');
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState(PROMOTION_STATUS.ALL);
    const [filterType, setFilterType] = useState('ALL');
    const [filterLoyalty, setFilterLoyalty] = useState(PROMOTION_CATEGORY.ALL);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data: apiResponse, isLoading: loading } = useAdminPromotionsQuery();
    const { data: statsData } = useAdminPromotionStatsQuery();
    const { toggleStatus, deletePromotion } = useAdminPromotionMutations();

    const allData = useMemo(() => {
        if (!apiResponse) return [];
        if (Array.isArray(apiResponse)) return apiResponse;
        return apiResponse.promotions || [];
    }, [apiResponse]);

    const stats = statsData || { active_campaigns: 0, total_claimed: 0, points_burned: 0 };

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

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await toggleStatus(id);
            message.success(t('msg_status_changed'));
        } catch {
            message.error(t('msg_error') || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePromotion(id);
            message.success('Đã xóa chiến dịch');
        } catch {
            message.error(t('msg_error') || 'Có lỗi xảy ra');
        }
    };

    const filteredData = useMemo(() => {
        return allData.filter(item => {
            const matchSearch = item.title?.toLowerCase().includes(searchText);
            const matchStatus = filterStatus === PROMOTION_STATUS.ALL || item.status === filterStatus;
            const matchType = filterType === 'ALL' || item.discount_type === filterType;

            let matchLoyalty = true;
            if (filterLoyalty === PROMOTION_CATEGORY.LOYALTY) matchLoyalty = item.is_loyalty === true;
            if (filterLoyalty === PROMOTION_CATEGORY.GLOBAL) matchLoyalty = item.is_loyalty === false;

            return matchSearch && matchStatus && matchType && matchLoyalty;
        });
    }, [allData, searchText, filterStatus, filterType, filterLoyalty]);

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
            pageSize,
            total: filteredData.length,
            showSizeChanger: true,
        },
    };
};
