import axiosClient from '../../utils/axiosClient';

export const profileApi = {
    getProfile: async () => {
        const data = await axiosClient.get('/client/profile');
        return data;
    },

    updateProfile: async (payload) => {
        const data = await axiosClient.put('/client/profile', payload);
        return data;
    }
};
