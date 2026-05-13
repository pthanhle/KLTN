import axiosClient from '../../utils/axiosClient';

export const adminCustomerApi = {

    getCustomers: async (params = {}) => {
        const response = await axiosClient.get('/admin/customers', { params });
        return response;
    },

    getCustomerStats: async () => {
        const response = await axiosClient.get('/admin/customers/stats');
        return response;
    },

    getCustomerById: async (id) => {
        const response = await axiosClient.get(`/admin/customers/${id}`);
        return response;
    },


    updateCustomer: async (id, data) => {
        const response = await axiosClient.put(`/admin/customers/${id}`, data);
        return response;
    },

    deleteCustomer: async (id) => {
        const response = await axiosClient.delete(`/admin/customers/${id}`);
        return response;
    },

    getOrdersByCustomer: async (id, params = {}) => {
        const response = await axiosClient.get(`/admin/customers/${id}/orders`, { params });
        return response;
    },

    getBookingsByCustomer: async (id, params = {}) => {
        const response = await axiosClient.get(`/admin/customers/${id}/bookings`, { params });
        return response;
    },

    createCustomer: async (data) => {
        const response = await axiosClient.post('/admin/customers', data);
        return response;
    },

    verifyCustomerOTP: async (email, otp) => {
        const response = await axiosClient.post('/admin/customers/verify-otp', { email, otp });
        return response;
    },
};
