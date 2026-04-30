import axiosClient from '../../utils/axiosClient';

export const serviceCategoryAPI = {
    // Admin routes
    getAdminServiceCategories: (params) => axiosClient.get('/admin/service-categories', { params }),
    getAdminServiceCategoryById: (id) => axiosClient.get(`/admin/service-categories/${id}`),
    createServiceCategory: (data) => axiosClient.post('/admin/service-categories', data),
    updateServiceCategory: (id, data) => axiosClient.put(`/admin/service-categories/${id}`, data),
    deleteServiceCategory: (id) => axiosClient.delete(`/admin/service-categories/${id}`),
    toggleServiceCategoryStatus: (id) => axiosClient.patch(`/admin/service-categories/${id}/toggle-status`),

    // Client routes
    getClientServiceCategories: () => axiosClient.get('/client/services/categories'),
};
