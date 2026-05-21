import axiosClient from '../../utils/axiosClient';

export const adminOrderApi = {

    getOrders: async (params = {}) => {
        const response = await axiosClient.get('/admin/orders', { params });
        return response;
    },

    getOrderById: async (id) => {
        const response = await axiosClient.get(`/admin/orders/${id}`);
        return response;
    },

    updateOrder: async (id, data) => {
        const response = await axiosClient.put(`/admin/orders/${id}`, data);
        return response;
    },

    deleteOrder: async (id) => {
        const response = await axiosClient.delete(`/admin/orders/${id}`);
        return response;
    },
};
