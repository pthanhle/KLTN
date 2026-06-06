import axiosClient from '../../utils/axiosClient';

export const getClientCostEstimateConfig = async () => {
    const response = await axiosClient.get('/client/cost-estimate');
    return response.data;
};

export const getAdminCostEstimateConfig = async () => {
    const response = await axiosClient.get('/admin/settings/cost-estimate');
    return response.data;
};

export const updateAdminCostEstimateConfig = async (data) => {
    const response = await axiosClient.put('/admin/settings/cost-estimate', data);
    return response.data;
};
