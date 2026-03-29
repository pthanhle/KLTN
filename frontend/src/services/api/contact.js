import { mockSystemSettingsApi, mapSettingsToContactData } from '../../pages/Customer/Contact/data/contact.mock';

export const ContactAPI = {
    // API Call to get configuration/contact info (simulating BE fetch from Settings Table)
    getContactConfig: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Here we fetch raw data and map it
                const mappedData = mapSettingsToContactData(mockSystemSettingsApi);
                resolve(mappedData); // Assume axios unwrap gives data
            }, 1000); // Simulate 1s network latency for Skeleton rendering
        });
    },
    
    // API Call to submit the form
    submitContact: async (payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Random failure simulation could be here
                resolve({ success: true, data: payload });
            }, 1500);
        });
    }
};
