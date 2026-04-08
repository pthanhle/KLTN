import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { isBuyNow, ...partData } = action.payload;

            const exists = state.items.find(item =>
                item.part_id === partData.part_id &&
                JSON.stringify(item.selected_options || {}) === JSON.stringify(partData.selected_options || {})
            );

            if (isBuyNow) {
                state.items.forEach(item => { item.checked = false; });
            }

            if (!exists) {
                state.items.push({ ...partData, quantity: partData.quantity || 1, checked: true });
            } else {
                exists.quantity += (partData.quantity || 1);
                if (isBuyNow) exists.checked = true;
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCartItems: (state, action) => {
            const newItems = action.payload;
            state.items = newItems.map(item => {
                const existing = state.items.find(i => i.id === item.id);
                return { ...item, checked: existing ? existing.checked : true };
            });
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item && action.payload.quantity >= 1) item.quantity = action.payload.quantity;
        },
        toggleChecked: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.checked = !item.checked;
        },
        isolateCheckedItem: (state, action) => {
            state.items.forEach(item => {
                item.checked = String(item.part_id) === String(action.payload);
            });
        },
        toggleAllChecks: (state, action) => {
            state.items.forEach(i => i.checked = action.payload);
        }
    }
});

export const { addToCart, removeFromCart, clearCart, setCartItems, updateQuantity, toggleChecked, toggleAllChecks, isolateCheckedItem } = cartSlice.actions;
export default cartSlice.reducer;
