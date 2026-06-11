import { useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { App } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChecked, toggleAllChecks as toggleAllRedux, setCartItems, removeFromCart as removeFromReduxCart, updateQuantity as updateReduxQuantity } from '@/store/slices/cartSlice';

import { useGetCart, useUpdateCartItem, useRemoveFromCart } from '@/services/queries/clientCart.queries';
import { useToggleWishlist } from '@/services/queries/clientWishlist.queries';

import { useApplyPromoCode } from '../../../../services/queries/checkoutQueries';
import { calculateSubtotal } from '../utils/calculator';

export const useCart = (t) => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const { data: serverCart, refetch: refetchCart, isLoading: isLoadingCart } = useGetCart();
    const { mutate: updateApiQuantity } = useUpdateCartItem();
    const { mutate: removeApiItem } = useRemoveFromCart();
    const { mutate: toggleWishlist } = useToggleWishlist();

    const { message } = App.useApp();

    useEffect(() => {
        if (serverCart?.data?.items) {
            dispatch(setCartItems(serverCart.data.items));
        }
    }, [serverCart, dispatch]);

    const checkedItems = useMemo(() => cartItems.filter(item => item.checked), [cartItems]);
    const subtotal = useMemo(() => calculateSubtotal(checkedItems), [checkedItems]);

    const hasItems = cartItems.length > 0;
    const hasCheckedItems = checkedItems.length > 0;

    const toggleItemCheck = (id) => {
        const item = cartItems.find(i => i.id === id);
        if (item && (item.inventory?.available_stock || 0) > 0) {
            dispatch(toggleChecked(id));
        } else {
            message.warning(t('item_out_of_stock', 'Sản phẩm tạm hết hàng, không thể chọn mua.'));
        }
    };

    const toggleAllChecks = (selectAll) => {
        if (selectAll) {
            const inStockItems = cartItems.filter(item => (item.inventory?.available_stock || 0) > 0);
            if (inStockItems.length === 0) {
                message.warning(t('no_in_stock_items', 'Không có sản phẩm nào còn hàng để chọn.'));
                return;
            }
            const validIds = inStockItems.map(item => item.id);
            dispatch(toggleAllRedux({ selectAll: true, validIds }));
        } else {
            dispatch(toggleAllRedux({ selectAll: false }));
        }
    };

    const timersRef = useRef({});

    const updateQuantity = (id, delta) => {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;
        const newQuantity = item.quantity + delta;
        const maxStock = item.inventory?.available_stock || 0;

        if (newQuantity > maxStock) {
            message.warning(t('max_stock_reached', `Xin lỗi, kho chỉ còn ${maxStock} đơn vị sản phẩm này.`));
            return;
        }

        if (newQuantity >= 1) {
            dispatch(updateReduxQuantity({ id, quantity: newQuantity }));

            if (timersRef.current[id]) {
                clearTimeout(timersRef.current[id]);
            }

            timersRef.current[id] = setTimeout(() => {
                updateApiQuantity({ item_id: id, quantity: newQuantity }, {
                    onError: (err) => {
                        message.error(err.response?.data?.message || 'Không thể cập nhật số lượng');
                        refetchCart();
                    }
                });
                delete timersRef.current[id];
            }, 500);
        }
    };

    const removeItem = (id) => {
        dispatch(removeFromReduxCart(id));

        removeApiItem(id, {
            onSuccess: () => {
                message.success(t('remove_success', "Đã xóa sản phẩm khỏi giỏ hàng."));
            },
            onError: (err) => {
                message.error(err.response?.data?.message || 'Có lỗi khi xóa');
                refetchCart();
            }
        });
    };

    const applyPromoMutation = useApplyPromoCode();

    const handleAddToWishlist = (id, name) => {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            toggleWishlist(item.part_id, {
                onSuccess: () => {
                    message.success({ content: t('move_wishlist_success', `Đã chuyển "${name}" vào mục Yêu thích!`), key: 'wishlist' });
                    removeItem(item.id);
                },
                onError: (err) => {
                    message.error(err.response?.data?.message || 'Lỗi lưu yêu thích');
                }
            });
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
        toggleItemCheck, toggleAllChecks, updateQuantity, removeItem, moveToWishlist: handleAddToWishlist, applyPromoCode,
        isLoadingCart
    };
};
