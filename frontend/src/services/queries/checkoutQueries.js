import { useQuery, useMutation } from '@tanstack/react-query';
import { CheckoutAPI } from '../api/checkout';

// Query: Fetch Giỏ Hàng
export const useGetCartItems = (options = {}) => {
    return useQuery({
        queryKey: ['cartItems'],
        queryFn: () => CheckoutAPI.getCartItems(),
        staleTime: 5 * 60 * 1000,
        ...options
    });
};

// Mutation: Gửi Đơn Đặt Hàng Mới
export const useSubmitOrder = () => {
    return useMutation({
        mutationFn: (payload) => CheckoutAPI.submitOrder(payload),
        onError: (error) => {
            console.error('[Mutation Submit Order Error]:', error);
        }
    });
};

// Mutation: Đẩy sản phẩm sang Wishlist (Yêu thích)
export const useMoveToWishlist = () => {
    return useMutation({
        mutationFn: (id) => CheckoutAPI.moveToWishlist(id),
        onError: (error) => {
            console.error('[Mutation Wishlist Error]:', error);
        }
    });
};

// Mutation: Kiểm tra Mã giảm giá
export const useApplyPromoCode = () => {
    return useMutation({
        mutationFn: (code) => CheckoutAPI.applyPromoCode(code),
    });
};

// Query: Fetch Thông tin Người Dùng mồi cho Form
export const useGetCheckoutProfile = (options = {}) => {
    return useQuery({
        queryKey: ['checkoutProfile'],
        queryFn: () => CheckoutAPI.getUserProfile(),
        staleTime: 10 * 60 * 1000, // 10 min cache
        ...options
    });
};
