import axiosClient from '../../utils/axiosClient';

export const adminDashboardApi = {
    getDashboardStats: async () => {
        const response = await axiosClient.get('/admin/dashboard');
        return response;
    }
};
