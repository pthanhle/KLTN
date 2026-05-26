import axiosClient from '../../utils/axiosClient';

export const CheckoutAPI = {
    getCartItems: async () => {
        const response = await axiosClient.get('/client/cart');
        return response.data.items;
    },

    submitOrder: async (payload) => {
        const res = await axiosClient.post('/client/orders', payload);
        return res;
    },

    moveToWishlist: async (payload) => {
        const res = await axiosClient.post('/client/wishlist/toggle', payload);
        return res;
    },

    applyPromoCode: async (code) => {
        const res = await axiosClient.post('/client/cart/apply-promo', { code });
        return res;
    },

    getUserProfile: async () => {
        const data = await axiosClient.get('/client/profile');
        return data || null;
    },

    getOrderById: async (id) => {
        const data = await axiosClient.get(`/client/orders/${id}`);
        return data?.order || data || null;
    },

    createVNPayPayment: async (orderId, amount) => {
        const data = await axiosClient.post('/client/payments/vnpay', { order_id: orderId, amount });
        return data || null;
    }
};
