import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { App } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity as updateReduxQuantity, toggleChecked, toggleAllChecks as toggleAllRedux } from '@/store/slices/cartSlice';
import { addToWishlist } from '@/store/slices/wishlistSlice';
import { useApplyPromoCode } from '../../../../services/queries/checkoutQueries';
import { calculateSubtotal } from '../utils/calculator';

export const useCart = (t) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    const { message } = App.useApp();

    const checkedItems = useMemo(() => cartItems.filter(item => item.checked), [cartItems]);
    const subtotal = useMemo(() => calculateSubtotal(checkedItems), [checkedItems]);

    const hasItems = cartItems.length > 0;
    const hasCheckedItems = checkedItems.length > 0;

    const toggleItemCheck = (id) => {
        dispatch(toggleChecked(id));
    };

    const toggleAllChecks = (selectAll) => {
        dispatch(toggleAllRedux(selectAll));
    };

    const updateQuantity = (id, delta) => {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;
        const newQuantity = item.quantity + delta;
        const maxStock = item.inventory ? (item.inventory.showroom + item.inventory.warehouse) : (item.stock || 99); 
        if (newQuantity >= 1 && newQuantity <= maxStock) {
            dispatch(updateReduxQuantity({ id, quantity: newQuantity }));
        }
    };

    const removeItem = (id) => {
        dispatch(removeFromCart(id));
        message.success(t('remove_success', "Đã xóa sản phẩm"));
    };

    const applyPromoMutation = useApplyPromoCode();

    const handleAddToWishlist = (id, name) => {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            dispatch(addToWishlist({
                id: `p_${item.product_id || item.id}`,
                product_id: item.product_id || item.id,
                brand: item.brand || 'Phụ kiện',
                name: item.name,
                image: item.image,
                price: item.price,
                original_price: item.original_price,
                stock_status: item.stock > 0 ? 'in_stock' : 'out_of_stock',
                rating: item.rating || 5.0,
                reviews_count: item.reviews_count || 0
            }));
            message.success({ content: t('move_wishlist_success', `Đã lưu "${name}" vào mục Yêu thích!`), key: 'wishlist' });
        }
    };

    const applyPromoCode = (code) => {
        if (!code) return;
        applyPromoMutation.mutate(code, {
            onSuccess: () => {
                message.success(t('apply_promo_success', `Đã áp dụng mã: ${code}`));
            }
        });
    };

    return {
        cartItems, checkedItems, subtotal, hasItems, hasCheckedItems,
        toggleItemCheck, toggleAllChecks, updateQuantity, removeItem, moveToWishlist: handleAddToWishlist, applyPromoCode
    };
};
