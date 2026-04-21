import axiosClient from '../../utils/axiosClient';

export const AiAPI = {
    askPricing: async (message, conversation_id = null) => {
        try {
            const response = await axiosClient.post('/ai/chat', {
                message,
                conversation_id
            });
            return response;
        } catch (error) {
            console.error('[AiAPI] Error asking AI:', error);
            throw error;
        }
    },

    getConversations: async () => {
        try {
            const response = await axiosClient.get('/ai/conversations');
            return response;
        } catch (error) {
            console.error('[AiAPI] Error fetching conversations:', error);
            throw error;
        }
    },

    getMessages: async (id) => {
        try {
            const response = await axiosClient.get(`/ai/conversations/${id}/messages`);
            return response;
        } catch (error) {
            console.error('[AiAPI] Error fetching messages:', error);
            throw error;
        }
    },

    deleteConversation: async (id) => {
        try {
            const response = await axiosClient.delete(`/ai/conversations/${id}`);
            return response;
        } catch (error) {
            console.error('[AiAPI] Error deleting conversation:', error);
            throw error;
        }
    }
};
