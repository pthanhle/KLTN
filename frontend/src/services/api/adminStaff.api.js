import axiosClient from '../../utils/axiosClient';

export const AdminStaffAPI = {
    getStaff: async (params) => {
        const response = await axiosClient.get('/admin/staff', { params });
        return response;
    },
    getStaffById: async (id) => {
        const response = await axiosClient.get(`/admin/staff/${id}`);
        return response;
    },
    createStaff: async (data) => {
        const response = await axiosClient.post('/admin/staff', data);
        return response;
    },
    updateStaff: async (id, data) => {
        const response = await axiosClient.put(`/admin/staff/${id}`, data);
        return response;
    },
    deleteStaff: async (id) => {
        const response = await axiosClient.delete(`/admin/staff/${id}`);
        return response;
    },
    resetPassword: async (id, data) => {
        const response = await axiosClient.post(`/admin/staff/${id}/reset-password`, data);
        return response;
    },
    getDepartments: async () => {
        const response = await axiosClient.get('/admin/staff/departments');
        return response;
    },
    updateProfile: async (id, data) => {
        const response = await axiosClient.put(`/admin/staff/${id}/profile`, data);
        return response;
    },
    getCompliance: async (id) => {
        const response = await axiosClient.get(`/admin/staff/${id}/compliance`);
        return response;
    },
    updateCompliance: async (id, data) => {
        const response = await axiosClient.put(`/admin/staff/${id}/compliance`, data);
        return response;
    },
};
