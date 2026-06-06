import axiosClient from '../../utils/axiosClient';

export const bookingApi = {
    fetchBookings: async (filters = {}) => {
        const { page = 1, pageSize = 10, date, status, type, search } = filters;
        const params = { page, limit: pageSize };
        if (date) params.date = date;
        if (status && status !== 'all') params.status = status;
        if (type && type !== 'all') params.type = type;
        if (search) params.search = search;

        return axiosClient.get('/admin/test-drives', { params });
    },

    fetchSalesStaff: async () => {
        return axiosClient.get('/admin/test-drives/staff/sales');
    },

    assignBookingToStaff: async (bookingId, staffId, priority, note) => {
        return axiosClient.put(`/admin/test-drives/${bookingId}/assign`, {
            staffId,
            priority: priority || 'MEDIUM',
            note: note || '',
        });
    },
};
