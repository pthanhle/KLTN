import axiosClient from '../../utils/axiosClient';

export const adminCustomerApi = {

    getCustomers: async (params = {}) => {
        const response = await axiosClient.get('/admin/customers', { params });
        return response;
    },

    getCustomerById: async (id) => {
        const response = await axiosClient.get(`/admin/customers/${id}`);
        return response.data;
    },


    updateCustomer: async (id, data) => {
        const response = await axiosClient.put(`/admin/customers/${id}`, data);
        return response.data;
    },

    deleteCustomer: async (id) => {
        const response = await axiosClient.delete(`/admin/customers/${id}`);
        return response.data;
    },

    getOrdersByCustomer: async (id, params = {}) => {
        const response = await axiosClient.get(`/admin/customers/${id}/orders`, { params });
        return response.data;
    },

    getBookingsByCustomer: async (id, params = {}) => {
        const response = await axiosClient.get(`/admin/customers/${id}/bookings`, { params });
        return response.data;
    },
};
