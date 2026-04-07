import axiosClient from "../../utils/axiosClient";

export const clientPartApi = {
    getActiveParts: async (params = {}) => {
        const response = await axiosClient.get('/client/parts', { params });
        return response; 
    },

    getPartBySlug: async (slug) => {
        const response = await axiosClient.get(`/client/parts/${slug}`);
        return response;
    },

    getCategories: async () => {
        const response = await axiosClient.get('/client/parts/categories');
        return response.data;
    },

    getBrands: async () => {
        const response = await axiosClient.get('/client/parts/brands');
        return response.data;
    },

    submitPartReview: async (reviewData) => {
        const { part_id, ...rest } = reviewData;
        const response = await axiosClient.post(`/client/parts/${part_id}/reviews`, rest);
        return response;
    },


    deletePartReview: async (reviewId) => {
        const response = await axiosClient.delete(`/client/parts/reviews/${reviewId}`);
        return response;
    },

    likePartReview: async (reviewId) => {
        const response = await axiosClient.post(`/client/parts/reviews/${reviewId}/like`);
        return response;
    },

    editPartReview: async (reviewId, data) => {
        const response = await axiosClient.put(`/client/parts/reviews/${reviewId}`, data);
        return response;
    },

    replyPartReview: async (reviewId, content) => {
        const response = await axiosClient.post(`/client/parts/reviews/${reviewId}/reply`, { content });
        return response;
    },

    deletePartReviewReply: async (reviewId, replyId) => {
        const response = await axiosClient.delete(`/client/parts/reviews/${reviewId}/reply/${replyId}`);
        return response;
    },

    editPartReviewReply: async (reviewId, replyId, content) => {
        const response = await axiosClient.put(`/client/parts/reviews/${reviewId}/reply/${replyId}`, { content });
        return response;
    }
};
