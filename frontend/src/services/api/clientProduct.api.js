import axiosClient from '../../utils/axiosClient';

export const getClientProducts = async (params) => {
    const response = await axiosClient.get('/client/products', { params });
    return response.data;
};

export const getClientProductFilters = async () => {
    return await axiosClient.get('/client/products/filters');
};

export const getAllClientProducts = async () => {
    return await axiosClient.get('/client/products/all');
};

export const getClientProductById = async (id) => {
    const response = await axiosClient.get(`/client/products/${id}`);
    return response.data;
};

export const getFeaturedProducts = async () => {
    return await axiosClient.get('/client/products/featured');
};

