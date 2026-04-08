import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api/clientCart.api';
import { useDispatch } from 'react-redux';
import { setCartItems } from '@/store/slices/cartSlice';

export const useGetCart = (isAuthenticated = true) => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const data = await cartApi.getCart();
            dispatch(setCartItems(data?.data?.items || []));
            return data;
        },
        enabled: !!isAuthenticated,
        staleTime: 5 * 60 * 1000
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => cartApi.addToCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => cartApi.updateCartItem(payload),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item_id) => cartApi.removeFromCart(item_id),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => cartApi.clearCart(),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    });
};
