import axiosClient from '../../utils/axiosClient';

// axiosClient interceptor already extracts response.data, so methods return the body directly.
export const AdminRepairAPI = {
    getRepairProgresses: async (params) => {
        return axiosClient.get('/staff/service/repair-progress', { params });
    },

    assignMechanic: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/assign', payload);
    },

    getRepairProgressById: async (id) => {
        return axiosClient.get(`/staff/service/repair-progress/${id}`);
    },

    processReception: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/reception', payload);
    },

    updateDiagnostics: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/diagnostics', payload);
    },

    createQuotation: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/quotation', payload);
    },

    approveQuotation: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/quotation/approve', payload);
    },

    updateQC: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/qc', payload);
    },

    processHandover: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/handover', payload);
    },
};
