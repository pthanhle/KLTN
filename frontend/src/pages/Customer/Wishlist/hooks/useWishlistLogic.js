import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { getFullProductDetails } from '../utils/wishlistUtils';

export const useWishlistLogic = () => {
    const { message } = App.useApp();
    const { t } = useTranslation(['wishlist', 'layout']);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(state => state.wishlist.items);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isRemoving, setIsRemoving] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(null);
    const [isBuyingNow, setIsBuyingNow] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // API Simulation Handlers
    const handleRemoveItem = useCallback((id) => {
        setIsRemoving(id);
        // Simulate API call
        setTimeout(() => {
            dispatch(removeFromWishlist(id));
            setIsRemoving(null);
            message.success(t('wishlist:remove_success', 'Đã xóa sản phẩm khỏi danh sách yêu thích!'));
        }, 400);
    }, [t, dispatch]);

    const handleClearAll = useCallback(() => {
        dispatch(clearWishlist());
        message.success(t('wishlist:clear_all_success', 'Đã làm trống danh sách yêu thích!'));
    }, [t, dispatch]);


    const handleAddToCart = useCallback((item) => {
        setIsAddingToCart(item.id);
        // Simulate API call POST /cart
        setTimeout(() => {
            const extraDetails = getFullProductDetails(item.product_id);
            dispatch(addToCart({ 
                ...item, 
                id: Date.now().toString(),
                sku: extraDetails.sku,
                stock: extraDetails.stock,
                condition: extraDetails.condition
            }));
            setIsAddingToCart(null);
            message.success(`${t('wishlist:add_to_cart_success', 'Đã thêm vào giỏ hàng:')} ${item.name}`);
        }, 500);
    }, [t, dispatch]);

    const handleBuyNow = useCallback((item) => {
        setIsBuyingNow(item.id);
        // Simulate API call POST /cart
        setTimeout(() => {
            const extraDetails = getFullProductDetails(item.product_id);
            dispatch(addToCart({ 
                ...item, 
                id: Date.now().toString(),
                sku: extraDetails.sku,
                stock: extraDetails.stock,
                condition: extraDetails.condition,
                isBuyNow: true
            }));
            setIsBuyingNow(null);
            message.success(t('wishlist:buy_now_processing', 'Đã thêm vào giỏ. Đang chuyển hướng...'));
            navigate('/cart');
        }, 800);
    }, [t, navigate, dispatch]);

    return {
        t,
        isLoading,
        items,
        isRemoving,
        isAddingToCart,
        isBuyingNow,
        formatCurrency: formatVND,
        handleRemoveItem,
        handleClearAll,
        handleAddToCart,
        handleBuyNow
    };
};
