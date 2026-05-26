import { useQuery, useMutation } from '@tanstack/react-query';
import { CheckoutAPI } from '../api/checkout';

export const useGetCartItems = (options = {}) => {
    return useQuery({
        queryKey: ['cartItems'],
        queryFn: () => CheckoutAPI.getCartItems(),
        staleTime: 5 * 60 * 1000,
        ...options
    });
};

export const useSubmitOrder = () => {
    return useMutation({
        mutationFn: (payload) => CheckoutAPI.submitOrder(payload),
        onError: (error) => {
            console.error('[Mutation Submit Order Error]:', error);
        }
    });
};

export const useMoveToWishlist = () => {
    return useMutation({
        mutationFn: (id) => CheckoutAPI.moveToWishlist(id),
        onError: (error) => {
            console.error('[Mutation Wishlist Error]:', error);
        }
    });
};

export const useApplyPromoCode = () => {
    return useMutation({
        mutationFn: (code) => CheckoutAPI.applyPromoCode(code),
    });
};

export const useGetCheckoutProfile = (options = {}) => {
    return useQuery({
        queryKey: ['checkoutProfile'],
        queryFn: () => CheckoutAPI.getUserProfile(),
        staleTime: 10 * 60 * 1000, // 10 min cache
        ...options
    });
};

export const useGetOrderById = (id, options = {}) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => CheckoutAPI.getOrderById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        ...options
    });
};

export const useGetMyOrders = (params = {}, options = {}) => {
    return useQuery({
        queryKey: ['myOrders', params],
        queryFn: () => CheckoutAPI.getMyOrders(params),
        staleTime: 60 * 1000,
        ...options
    });
};

export const useCancelOrder = () => {
    return useMutation({
        mutationFn: (id) => CheckoutAPI.cancelOrder(id)
    });
};

export const useConfirmReceipt = () => {
    return useMutation({
        mutationFn: (id) => CheckoutAPI.confirmReceipt(id)
    });
};


