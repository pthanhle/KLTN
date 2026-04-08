import axiosClient from '@/utils/axiosClient';

export const cartApi = {
    getCart: async () => {
        const response = await axiosClient.get('/client/cart');
        return response;
    },

    addToCart: async (data) => {
        // data expects { part_id, quantity, selected_options }
        const response = await axiosClient.post('/client/cart', data);
        return response;
    },

    updateCartItem: async (data) => {
        // data expects { item_id, quantity }
        const response = await axiosClient.put('/client/cart', data);
        return response;
    },

    removeFromCart: async (item_id) => {
        const response = await axiosClient.delete(`/client/cart/${item_id}`);
        return response;
    },

    clearCart: async () => {
        const response = await axiosClient.delete('/client/cart');
        return response;
    }
};
