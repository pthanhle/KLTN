import axiosClient from '../../utils/axiosClient';
export const CategoryAPI = {
    getCategoryList: (params) => axiosClient.get('/client/categories', { params }),

    getAdminCategories: (params) => axiosClient.get('/admin/categories', { params }),
    createAdminCategory: (data) => axiosClient.post('/admin/categories', data),
    updateAdminCategory: (id, data) => axiosClient.put(`/admin/categories/${id}`, data),
    deleteAdminCategory: (id) => axiosClient.delete(`/admin/categories/${id}`)
};
