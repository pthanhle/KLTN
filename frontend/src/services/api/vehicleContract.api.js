import axiosClient from '../../utils/axiosClient';

const getRequestConfig = (data) => {
    if (data instanceof FormData) {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
    }
    return {};
};

export const getVehicleContracts = async (params) => {
    const response = await axiosClient.get('/admin/vehicle-contracts', { params });
    return response;
};

export const getVehicleContractById = async (id) => {
    const response = await axiosClient.get(`/admin/vehicle-contracts/${id}`);
    return response.data;
};

export const createVehicleContract = async (data) => {
    const response = await axiosClient.post('/admin/vehicle-contracts', data, getRequestConfig(data));
    return response.data;
};

export const updateVehicleContract = async (id, data) => {
    const response = await axiosClient.put(`/admin/vehicle-contracts/${id}`, data, getRequestConfig(data));
    return response.data;
};

export const updateVehicleContractStatus = async (id, statusData) => {
    const response = await axiosClient.put(`/admin/vehicle-contracts/${id}/status`, statusData);
    return response.data;
};
