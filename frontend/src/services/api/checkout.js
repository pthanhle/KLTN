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

    getMyOrders: async (params = {}) => {
        const response = await axiosClient.get('/client/orders', { params });
        return response;
    },

    getOrderById: async (id) => {
        const data = await axiosClient.get(`/client/orders/${id}`);
        return data || null;
    },

    createVNPayPayment: async (orderId, amount) => {
        const data = await axiosClient.post('/client/payments/vnpay', { order_id: orderId, amount });
        return data || null;
    },

    createServiceDepositPayment: async (progressId) => {
        const data = await axiosClient.post('/client/payments/vnpay', { progress_id: progressId, payment_type: 'quotation_deposit' });
        return data || null;
    },

    createServiceFinalPayment: async (progressId) => {
        const data = await axiosClient.post('/client/payments/vnpay', { progress_id: progressId, payment_type: 'final_payment' });
        return data || null;
    },

    cancelOrder: async (id) => {
        const data = await axiosClient.put(`/client/orders/${id}/cancel`);
        return data;
    },

    confirmReceipt: async (id) => {
        const data = await axiosClient.put(`/client/orders/${id}/confirm-receipt`);
        return data;
    }
};
