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

export const getVehicleUnits = async (params) => {
    const response = await axiosClient.get('/admin/vehicle-units', { params });
    return response;
};

export const getVehicleUnitById = async (id) => {
    const response = await axiosClient.get(`/admin/vehicle-units/${id}`);
    return response;
};

export const createVehicleUnit = async (data) => {
    const response = await axiosClient.post('/admin/vehicle-units', data, getRequestConfig(data));
    return response;
};

export const updateVehicleUnit = async (id, data) => {
    const response = await axiosClient.put(`/admin/vehicle-units/${id}`, data, getRequestConfig(data));
    return response;
};

export const updateVehicleUnitStatus = async (id, statusData) => {
    const response = await axiosClient.put(`/admin/vehicle-units/${id}/status`, statusData);
    return response;
};
