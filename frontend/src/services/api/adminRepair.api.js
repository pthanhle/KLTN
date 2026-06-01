import axiosClient from '../../utils/axiosClient';

export const AdminRepairAPI = {
    getRepairProgresses: async (params) => {
        const response = await axiosClient.get('/staff/service/repair', { params });
        return response.data;
    },

    getRepairProgressById: async (id) => {
        const response = await axiosClient.get(`/staff/service/repair/${id}`);
        return response.data;
    },

    processReception: async (payload) => {
        const response = await axiosClient.post('/staff/service/repair/reception', payload);
        return response.data;
    },

    updateDiagnostics: async (payload) => {
        const response = await axiosClient.post('/staff/service/repair/diagnostics', payload);
        return response.data;
    },

    createQuotation: async (payload) => {
        const response = await axiosClient.post('/staff/service/repair/quotation', payload);
        return response.data;
    },

    approveQuotation: async (payload) => {
        const response = await axiosClient.post('/staff/service/repair/quotation/approve', payload);
        return response.data;
    },

    updateQC: async (payload) => {
        const response = await axiosClient.post('/staff/service/repair/qc', payload);
        return response.data;
    },

    processHandover: async (payload) => {
        const response = await axiosClient.post('/staff/service/repair/handover', payload);
        return response.data;
    },
};
