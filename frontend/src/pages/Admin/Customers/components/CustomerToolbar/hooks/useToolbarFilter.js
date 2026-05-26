import { useState, useEffect } from 'react';
import { MOCK_TIER_CONFIG } from '../../../data/tierConfig.mock';

export const useToolbarFilter = () => {
    const [filterConfig, setFilterConfig] = useState({
        status: 'all',
        tier: 'all',
        search: '',
        dateRange: null
    });

    const [filterOptions, setFilterOptions] = useState({
        statuses: [],
        tiers: []
    });

    // Giả lập Fetch dữ liệu cấu hình Lọc từ API (BE)
    useEffect(() => {
        const fetchFilterConfigs = async () => {
            // Giả lập call API `GET /api/v1/system/configs`
            // Statuses thường là ENUM từ DB
            const dbStatuses = [
                { id: 'active', name: 'adminCustomers:statusActive', fallback: 'Đang hoạt động' },
                { id: 'inactive', name: 'adminCustomers:statusInactive', fallback: 'Nháp' },
                { id: 'suspended', name: 'adminCustomers:statusSuspended', fallback: 'Bị khóa' }
            ];

            setFilterOptions({
                statuses: dbStatuses,
                tiers: MOCK_TIER_CONFIG // Data Tier thực tế DB
            });
        };
        fetchFilterConfigs();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilterConfig(prev => ({
            ...prev,
            [key]: value
        }));
        // Trong thực tế sẽ gọi API `GET /customers?status=xxx&tier=yyy`
    };

    return {
        filterConfig,
        filterOptions,
        handleFilterChange
    };
};
