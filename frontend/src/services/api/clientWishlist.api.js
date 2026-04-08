import axiosClient from '@/utils/axiosClient';

export const wishlistApi = {
    getWishlist: async () => {
        const response = await axiosClient.get('/client/wishlist');
        return response;
    },

    toggleWishlist: async (part_id) => {
        const response = await axiosClient.post('/client/wishlist/toggle', { part_id });
        return response; // returns message and data{isAdded, wishlistCount}
    },

    clearWishlist: async () => {
        const response = await axiosClient.delete('/client/wishlist');
        return response;
    }
};
