import axiosClient from '../../utils/axiosClient';

export const brandAPI = {
    // Admin routes
    getAdminBrands: () => axiosClient.get('/admin/brands'),
    createBrand: (data) => axiosClient.post('/admin/brands', data),
    updateBrand: (id, data) => axiosClient.put(`/admin/brands/${id}`, data),
    deleteBrand: (id) => axiosClient.delete(`/admin/brands/${id}`),

    // Client routes
    getClientBrands: (isPartner) => {
        const query = isPartner !== undefined ? `?is_partner=${isPartner}` : '';
        return axiosClient.get(`/client/brands${query}`);
    }
};
