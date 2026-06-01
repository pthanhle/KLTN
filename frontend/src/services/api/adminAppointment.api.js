import axiosClient from '../../utils/axiosClient';

export const AdminAppointmentAPI = {
    getAppointments: async (params) => {
        const response = await axiosClient.get('/staff/service/appointments', { params });
        return response;
    },
    updateAppointment: async (id, payload) => {
        const response = await axiosClient.put(`/staff/service/appointments/${id}`, payload);
        return response;
    }
};
