import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTrackingData } from './useTrackingData';
import { getStageOptions, getStatusOptions } from '../utils/trackingUtils';
import { TRACKING_STAGES, TRACKING_STATUS_FILTERS } from '../constants/trackingConstants';

export const useTrackingTab = () => {
    const { t } = useTranslation('adminServiceReception');

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [stageFilter, setStageFilter] = useState(TRACKING_STAGES.ALL);
    const [statusFilter, setStatusFilter] = useState(TRACKING_STATUS_FILTERS.ALL);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const queryParams = {
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        stage: stageFilter,
        status: statusFilter
    };

    const { data: paginatedData, totalResults, isLoading } = useTrackingData(queryParams);

    const stageOptions = getStageOptions(t);
    const statusOptions = getStatusOptions(t);

    return {
        t,
        isLoading,
        searchTerm,
        setSearchTerm,
        stageFilter,
        setStageFilter,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        paginatedData,
        totalResults,
        stageOptions,
        statusOptions
    };
};
