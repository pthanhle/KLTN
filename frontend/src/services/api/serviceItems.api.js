import axiosClient from '../../utils/axiosClient';

export const serviceItemAPI = {
    // Admin routes
    getAdminServiceItems: (params) => axiosClient.get('/admin/service-items', { params }),
    getAdminServiceCategories: () => axiosClient.get('/admin/service-categories'),
    getAdminServiceItemById: (id) => axiosClient.get(`/admin/service-items/${id}`),
    createServiceItem: (data) => axiosClient.post('/admin/service-items', data),
    updateServiceItem: (id, data) => axiosClient.put(`/admin/service-items/${id}`, data),
    deleteServiceItem: (id) => axiosClient.delete(`/admin/service-items/${id}`),
    toggleServiceItemStatus: (id) => axiosClient.patch(`/admin/service-items/${id}/toggle-status`),

    // Client routes
    getClientServiceItems: (params) => axiosClient.get('/client/services', { params }),
    getClientServiceCategories: () => axiosClient.get('/client/services/categories'),
    getClientServiceItemById: (id) => axiosClient.get(`/client/services/${id}`)
};
