import axiosClient from '../../utils/axiosClient';

export const adminDashboardApi = {
    getPendingCounts: async () => {
        const response = await axiosClient.get('/admin/dashboard/pending-counts');
        return response;
    },
};
