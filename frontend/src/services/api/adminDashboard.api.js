import axiosClient from '../../utils/axiosClient';

export const adminDashboardApi = {
    getPendingCounts: async () => {
        const response = await axiosClient.get('/admin/dashboard/pending-counts');
        return response;
    },
    getRevenueAnalytics: async (params = {}) => {
        const response = await axiosClient.get('/admin/dashboard/revenue-analytics', { params });
        return response;
    },
};
