import { useQuery } from '@tanstack/react-query';
import { adminDashboardApi } from '../api/adminDashboard.api';

export const useAdminPendingCounts = () => {
    return useQuery({
        queryKey: ['admin-pending-counts'],
        queryFn: adminDashboardApi.getPendingCounts,
        refetchInterval: 30000,
        staleTime: 20000,
    });
};
