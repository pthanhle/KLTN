import axiosClient from '../../utils/axiosClient';

export const BookingAPI = {
    getTestDriveList: async (params) => {
        const response = await axiosClient.get('/client/bookings', { params: { booking_type: 'test_drive', ...params } });
        return response.data?.bookings || [];
    },

    getTestDriveById: async (id) => {
        const response = await axiosClient.get(`/client/bookings/${id}`);
        return response.data;
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
        const response = await axiosClient.get('/client/bookings', { params: { booking_type: 'service', ...params } });
        return response.data?.bookings || [];
    },

    submitServiceBooking: async (payload) => {
        const response = await axiosClient.post('/client/bookings', payload);
        return response;
    }
};
