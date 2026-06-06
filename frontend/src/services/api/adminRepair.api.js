import axiosClient from '../../utils/axiosClient';

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

    searchParts: async (params) => {
        return axiosClient.get('/staff/service/repair-progress/catalog/parts', { params });
    },

    searchServiceItems: async (params) => {
        return axiosClient.get('/staff/service/repair-progress/catalog/service-items', { params });
    },

    getServiceBays: async (params) => {
        return axiosClient.get('/staff/service/service-bays', { params });
    },

    createServiceBay: async (payload) => {
        return axiosClient.post('/staff/service/service-bays', payload);
    },

    deleteServiceBay: async (id) => {
        return axiosClient.delete(`/staff/service/service-bays/${id}`);
    },

    createSupplement: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/supplement', payload);
    },

    resolveSupplement: async (payload) => {
        return axiosClient.post('/staff/service/repair-progress/supplement/resolve', payload);
    },
};
