import axiosClient from '../../utils/axiosClient';

const getTrackingDetail = async (bookingCode, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axiosClient.get(`/client/tracking/${bookingCode}`, config);
    return response.data;
};

const lookupTracking = async (bookingCode, licensePlate) => {
    const response = await axiosClient.post(`/client/tracking/lookup`, {
        booking_code: bookingCode,
        license_plate: licensePlate
    });
    return response.data;
};
const getStats = async () => {
    const response = await axiosClient.get(`/client/tracking/stats`);
    return response.data;
};

export default {
    getTrackingDetail,
    lookupTracking,
    getStats,
};
