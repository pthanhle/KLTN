import axiosClient from '../../utils/axiosClient';

export const getAdminProducts = async (params) => {
    return await axiosClient.get('/admin/products', { params });
};

export const getAdminProductById = async (id) => {
    const response = await axiosClient.get(`/admin/products/${id}`);
    return response.data;
};

export const createAdminProduct = async (productData) => {
    const response = await axiosClient.post('/admin/products', productData);
    return response.data;
};

export const updateAdminProduct = async (id, productData) => {
    const response = await axiosClient.put(`/admin/products/${id}`, productData);
    return response.data;
};

export const deleteAdminProduct = async (id) => {
    const response = await axiosClient.delete(`/admin/products/${id}`);
    return response.data;
};
