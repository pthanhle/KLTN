import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { mockWishlistItems } from '../data/mockWishlist';

export const useWishlistLogic = () => {
    const { t } = useTranslation(['wishlist', 'layout']);
    const [items, setItems] = useState(mockWishlistItems);
    const [isRemoving, setIsRemoving] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(null);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleRemoveItem = useCallback((id) => {
        setIsRemoving(id);
        // Simulate API call
        setTimeout(() => {
            setItems(prev => prev.filter(item => item.id !== id));
            setIsRemoving(null);
            message.success(t('wishlist:remove_success', 'Đã xóa sản phẩm khỏi danh sách yêu thích!'));
        }, 400);
    }, [t]);

    const handleClearAll = useCallback(() => {
        setItems([]);
        message.success(t('wishlist:clear_all_success', 'Đã làm trống danh sách yêu thích!'));
    }, [t]);

    const handleAddToCart = useCallback((item) => {
        setIsAddingToCart(item.id);
        // Simulate API call
        setTimeout(() => {
            setIsAddingToCart(null);
            message.success(`${t('wishlist:add_to_cart_success', 'Đã thêm vào giỏ hàng:')} ${item.name}`);
        }, 500);
    }, [t]);

    return {
        t,
        items,
        isRemoving,
        isAddingToCart,
        formatCurrency,
        handleRemoveItem,
        handleClearAll,
        handleAddToCart
    };
};
