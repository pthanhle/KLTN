import axiosClient from '../../utils/axiosClient';

export const BookingAPI = {
    getTestDriveList: async (params) => {
        const response = await axiosClient.get('/client/bookings', { params: { booking_type: 'test_drive', ...params } });
        return response?.bookings || [];
    },

    getTestDriveById: async (id) => {
        const response = await axiosClient.get(`/client/bookings/${id}`);
        return response;
    },

    submitTestDrive: async (payload) => {
        const response = await axiosClient.post('/client/bookings', payload);
        return response;
    },

    cancelTestDrive: async (id) => {
        const response = await axiosClient.put(`/client/bookings/${id}/cancel`);
        return response;
    },

    getServiceBookingList: async (params) => {
        const [serviceRes, maintenanceRes] = await Promise.all([
            axiosClient.get('/client/bookings', { params: { booking_type: 'service', ...params } }),
            axiosClient.get('/client/bookings', { params: { booking_type: 'maintenance', ...params } }),
        ]);
        const serviceBookings = serviceRes?.bookings || [];
        const maintenanceBookings = maintenanceRes?.bookings || [];
        return [...serviceBookings, ...maintenanceBookings].sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date));
    },

    getAvailableTimeSlots: async (date) => {
        const response = await axiosClient.get('/client/bookings/available-slots', { params: { date } });
        return response || [];
    },

    submitServiceBooking: async (payload) => {
        const response = await axiosClient.post('/client/bookings', payload);
        return response;
    }
};
