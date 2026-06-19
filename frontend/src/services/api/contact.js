import axiosClient from '@/utils/axiosClient';
import { mockSystemSettingsApi, mapSettingsToContactData } from '../../pages/Customer/Contact/data/contact.mock';

export const ContactAPI = {
    getContactConfig: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mappedData = mapSettingsToContactData(mockSystemSettingsApi);
                resolve(mappedData);
            }, 1000);
        });
    },

    submitContact: async (payload) => {
        const response = await axiosClient.post('/client/contact/submit', payload);
        return response.data;
    }
};
