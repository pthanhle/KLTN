import axiosClient from '../../utils/axiosClient';

export const promotionAPI = {
    getAdminPromotions: (params = {}) =>
        axiosClient.get('/admin/promotions', { params }),

    getAdminPromotionStats: () =>
        axiosClient.get('/admin/promotions/stats'),

    getAdminPromotionById: (id) =>
        axiosClient.get(`/admin/promotions/${id}`),

    createPromotion: (data) =>
        axiosClient.post('/admin/promotions', data),

    updatePromotion: (id, data) =>
        axiosClient.put(`/admin/promotions/${id}`, data),

    togglePromotionStatus: (id) =>
        axiosClient.patch(`/admin/promotions/${id}/toggle-status`),

    deletePromotion: (id) =>
        axiosClient.delete(`/admin/promotions/${id}`),

    getActivePromotions: (params = {}) =>
        axiosClient.get('/client/promotions', { params }),

    getPromotionDetail: (id) =>
        axiosClient.get(`/client/promotions/${id}`),
};
