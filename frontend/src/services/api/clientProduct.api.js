import axios from 'axios';

const CLIENT_PRODUCT_URL = 'http://localhost:5000/api/client/products';

export const getClientProducts = async (params) => {
    const { data } = await axios.get(CLIENT_PRODUCT_URL, { params });
    return data;
};

export const getClientProductFilters = async () => {
    const { data } = await axios.get(`${CLIENT_PRODUCT_URL}/filters`);
    return data;
};

export const getAllClientProducts = async () => {
    const { data } = await axios.get(`${CLIENT_PRODUCT_URL}/all`);
    return data;
};

export const getClientProductById = async (id) => {
    const { data } = await axios.get(`${CLIENT_PRODUCT_URL}/${id}`);
    return data;
};
