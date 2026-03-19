import { createSlice } from '@reduxjs/toolkit';
import { mockCartItems } from '@/pages/Customer/Checkout/data/checkout.mock';

const initialState = {
    items: [...mockCartItems],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { isBuyNow, ...productData } = action.payload;
            const exists = state.items.find(item => item.product_id === productData.product_id);
            
            if (isBuyNow) {
                state.items.forEach(item => { item.checked = false; });
            }

            if (!exists) {
                state.items.push({ ...productData, quantity: productData.quantity || 1, checked: true });
            } else {
                exists.quantity += (productData.quantity || 1);
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
            state.items = action.payload; // Dùng khi call API GET /cart thành công
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item && action.payload.quantity >= 1) item.quantity = action.payload.quantity;
        },
        toggleChecked: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.checked = !item.checked;
        },
        toggleAllChecks: (state, action) => {
            state.items.forEach(i => i.checked = action.payload);
        }
    }
});

export const { addToCart, removeFromCart, clearCart, setCartItems, updateQuantity, toggleChecked, toggleAllChecks } = cartSlice.actions;
export default cartSlice.reducer;
