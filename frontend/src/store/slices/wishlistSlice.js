import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const index = state.items.findIndex(item => (item.part_id === action.payload.part_id || item.product_id === action.payload.product_id));
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(action.payload);
            }
        },
        addToWishlist: (state, action) => {
            const exists = state.items.find(item => (item.part_id === action.payload.part_id || item.product_id === action.payload.product_id));
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload && item.part_id !== action.payload && item.product_id !== action.payload);
        },
        clearWishlist: (state) => {
            state.items = [];
        },
        setWishlistItems: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist, setWishlistItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;
