import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '../api/clientWishlist.api';
import { useDispatch } from 'react-redux';
import { setWishlistItems } from '@/store/slices/wishlistSlice';

export const useGetWishlist = (isAuthenticated = true) => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const data = await wishlistApi.getWishlist();
            // Sync with Redux so that header badges don't lag
            dispatch(setWishlistItems(data?.data?.items || []));
            return data;
        },
        enabled: !!isAuthenticated,
        staleTime: 5 * 60 * 1000 // Cache 5 min
    });
};

export const useToggleWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (part_id) => wishlistApi.toggleWishlist(part_id),
        onSuccess: () => {
            // Invalidate the cache to trigger a background refetch
            queryClient.invalidateQueries(['wishlist']);
        }
    });
};

export const useClearWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => wishlistApi.clearWishlist(),
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist']);
        }
    });
};
