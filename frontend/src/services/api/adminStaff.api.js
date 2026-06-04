import axiosClient from '../../utils/axiosClient';

export const AdminStaffAPI = {
    getStaff: async (params) => {
        const response = await axiosClient.get('/admin/staff', { params });
        return response;
    }
};
