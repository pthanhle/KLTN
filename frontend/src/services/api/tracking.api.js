import axios from 'axios';
import { API_URL } from '../config';

const getTrackingDetail = async (bookingCode, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/client/tracking/${bookingCode}`, config);
    return response.data;
};

const lookupTracking = async (bookingCode, licensePlate) => {
    const response = await axios.post(`${API_URL}/client/tracking/lookup`, {
        booking_code: bookingCode,
        license_plate: licensePlate
    });
    return response.data;
};

export default {
    getTrackingDetail,
    lookupTracking,
};
