import axiosClient from '../../utils/axiosClient';

const getTrackingDetail = async (bookingCode) => {
    const response = await axiosClient.get(`/client/tracking/${bookingCode}`);
    return response;
};

const lookupTracking = async (bookingCode, licensePlate) => {
    const response = await axiosClient.post(`/client/tracking/lookup`, {
        booking_code: bookingCode,
        license_plate: licensePlate
    });
    return response;
};

const getStats = async () => {
    const response = await axiosClient.get(`/client/tracking/stats`);
    return response;
};

const approveSupplementRequest = async (bookingCode, supplementId) => {
    const response = await axiosClient.put(`/client/tracking/${bookingCode}/supplement/${supplementId}/approve`);
    return response;
};

const rejectSupplementRequest = async (bookingCode, supplementId) => {
    const response = await axiosClient.put(`/client/tracking/${bookingCode}/supplement/${supplementId}/reject`);
    return response;
};

export default {
    getTrackingDetail,
    lookupTracking,
    getStats,
    approveSupplementRequest,
    rejectSupplementRequest,
};
