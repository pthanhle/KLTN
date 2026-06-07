import axiosClient from '../../utils/axiosClient';

const STATUS_MAP = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    RECEIVED: 'Received',
    IN_PROGRESS: 'InProgress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
};

const normalizeTestDriveBooking = (b) => {
    const addr = b.delivery_address && typeof b.delivery_address === 'object' ? b.delivery_address : {};
    const dateStr = b.booking_date ? b.booking_date.substring(0, 10) : '';
    return {
        _id: b._id,
        booking_code: b.booking_code,
        status: STATUS_MAP[b.booking_status] || b.booking_status,
        selectedDate: dateStr,
        selectedTimeSlot: b.time_slot,
        bookingType: b.test_drive_type || 'showroom',
        showroomBranch: b.showroom_branch,
        city: addr.city || '',
        district: addr.district || '',
        ward: addr.ward || '',
        addressDetail: addr.street || (typeof b.delivery_address === 'string' ? b.delivery_address : ''),
        note: b.customer_note || '',
        carDetails: {
            name: b.product_id?.name || '',
            image: b.product_id?.image || '',
        },
        carId: b.product_id?._id || null,
        advisor_id: b.advisor_id,
    };
};

export const BookingAPI = {
    getTestDriveList: async (params) => {
        const response = await axiosClient.get('/client/bookings', { params: { booking_type: 'test_drive', ...params } });
        return (response?.bookings || []).map(normalizeTestDriveBooking);
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

    rescheduleTestDrive: async (id, payload) => {
        const response = await axiosClient.put(`/client/bookings/${id}/reschedule`, payload);
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
