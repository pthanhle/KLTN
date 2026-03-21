import axiosClient from '../../utils/axiosClient';

/**
 * Thư mục API Tập trung (Centralized Services Architect)
 * Nơi chứa khai báo Endpoint gọi Chatbot AI
 */
export const AiAPI = {
    // API POST - Gửi tin nhắn cho AI
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
