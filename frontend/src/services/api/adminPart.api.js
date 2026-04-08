import axiosClient from '../../utils/axiosClient';

export const adminPartApi = {
    getAllParts: async (params = {}) => {
        const response = await axiosClient.get('/admin/parts', { params });
        return response; // response here IS already the backend payload
    },

    getPartById: async (id) => {
        const response = await axiosClient.get(`/admin/parts/${id}`);
        return response.data;
    },

    createPart: async (partData) => {
        const response = await axiosClient.post('/admin/parts', partData);
        return response.data;
    },

    updatePart: async (id, partData) => {
        const response = await axiosClient.put(`/admin/parts/${id}`, partData);
        return response.data;
    },

    deletePart: async (id) => {
        const response = await axiosClient.delete(`/admin/parts/${id}`);
        return response;
    },

    // ---- BULK & TOGGLE ACTIONS ----
    updatePartStatus: async (id, status) => {
        const response = await axiosClient.patch(`/admin/parts/${id}/status`, { status });
        return response;
    },

    bulkDeleteParts: async (ids) => {
        const response = await axiosClient.post('/admin/parts/bulk-delete', { ids });
        return response;
    },

    // ---- META DATA ----
    getFiltersData: async () => {
        const [categoriesRes, brandsRes, conditionsRes] = await Promise.all([
            axiosClient.get('/admin/part-meta/categories'),
            axiosClient.get('/admin/part-meta/brands'),
            axiosClient.get('/admin/part-meta/conditions')
        ]);

        return {
            categories: categoriesRes.data || [],
            brands: brandsRes.data || [],
            conditions: conditionsRes.data || []
        };
    },

    createPartBrand: async (name) => {
        const response = await axiosClient.post('/admin/part-meta/brands', { name });
        return response;
    },

    createPartCondition: async (name) => {
        const response = await axiosClient.post('/admin/part-meta/conditions', { name });
        return response;
    }
};
