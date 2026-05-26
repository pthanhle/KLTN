import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '../api/adminDashboard.api';

export const ADMIN_DASHBOARD_KEYS = {
    all: ['adminDashboard'],
    stats: () => [...ADMIN_DASHBOARD_KEYS.all, 'stats'],
};

export const useDashboardStats = (options = {}) => {
    return useQuery({
        queryKey: ADMIN_DASHBOARD_KEYS.stats(),
        queryFn: () => adminDashboardApi.getDashboardStats(),
        staleTime: 5 * 60 * 1000,
        ...options,
    });
};
