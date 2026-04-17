import axios from 'axios';

const ADMIN_PRODUCT_URL = 'http://localhost:5000/api/admin/products';

export const getAdminProducts = async (params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params
    };
    const { data } = await axios.get(ADMIN_PRODUCT_URL, config);
    return data;
};

export const getAdminProductById = async (id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    const { data } = await axios.get(`${ADMIN_PRODUCT_URL}/${id}`, config);
    return data;
};

export const createAdminProduct = async (productData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    const { data } = await axios.post(ADMIN_PRODUCT_URL, productData, config);
    return data;
};

export const updateAdminProduct = async (id, productData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    const { data } = await axios.put(`${ADMIN_PRODUCT_URL}/${id}`, productData, config);
    return data;
};

export const deleteAdminProduct = async (id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    const { data } = await axios.delete(`${ADMIN_PRODUCT_URL}/${id}`, config);
    return data;
};
