import axiosClient from '../../utils/axiosClient';

export const AiAPI = {
    askPricing: async (message) => {
        try {
            const response = await axiosClient.post('/ai/chat', { message });
            return response;
        } catch (error) {
            console.error('[AiAPI] Error asking AI:', error);
            throw error;
        }
    }
};
