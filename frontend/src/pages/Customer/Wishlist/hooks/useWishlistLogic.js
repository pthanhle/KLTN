import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';
import { DUMMY_CARS } from '@/pages/Customer/Cars/data/cars.mock';

import {
    useGetWishlist,
    useToggleWishlist,
    useClearWishlist
} from '@/services/queries/clientWishlist.queries';

import { useAddToCart } from '@/services/queries/clientCart.queries';

export const useWishlistLogic = () => {
    const { message } = App.useApp();
    const { t } = useTranslation(['wishlist', 'layout']);
    const navigate = useNavigate();

    const { data: wishlistData, isLoading } = useGetWishlist();
    const { mutate: toggleWishlist } = useToggleWishlist();
    const { mutate: clearWishlist } = useClearWishlist();
    const { mutate: addToCart } = useAddToCart();

    const rawItems = wishlistData?.data?.items || [];

    const items = rawItems.map(item => {
        if (item.type === 'car') {
            const mockCar = DUMMY_CARS.find(c => String(c.id) === String(item.part_id));
            if (mockCar) {
                return {
                    ...item,
                    name: mockCar.name,
                    price: mockCar.price,
                    original_price: mockCar.price,
                    image: mockCar.image,
                    slug: String(mockCar.id),
                    brand: mockCar.brandName || 'Oto',
                    stock_status: 'in_stock',
                    condition: mockCar.isNew ? 'Mới' : 'Cũ',
                };
            }
        }
        return item;
    });
    const [isRemoving, setIsRemoving] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(null);
    const [isBuyingNow, setIsBuyingNow] = useState(null);

    const handleRemoveItem = useCallback((id) => {
        setIsRemoving(id);
        toggleWishlist(id, {
            onSuccess: () => {
                message.success(t('wishlist:remove_success', 'Đã xóa sản phẩm khỏi danh sách yêu thích!'));
            },
            onError: (err) => {
                message.error(err.response?.data?.message || 'Có lỗi xảy ra');
            },
            onSettled: () => {
                setIsRemoving(null);
            }
        });
    }, [t, toggleWishlist, message]);

    const handleClearAll = useCallback(() => {
        clearWishlist(undefined, {
            onSuccess: () => {
                message.success(t('wishlist:clear_all_success', 'Đã làm trống danh sách yêu thích!'));
            },
            onError: (err) => {
                message.error(err.response?.data?.message || 'Có lỗi xảy ra');
            }
        });
    }, [t, clearWishlist, message]);

    const handleAddToCart = useCallback((item) => {
        if (item.options && item.options.length > 0) {
            message.info(t('wishlist:require_options', 'Vui lòng chọn biến thể trước khi thêm vào giỏ.'));
            navigate(`/parts/${item.part_id}`);
            return;
        }

        setIsAddingToCart(item.id);

        addToCart({
            part_id: item.part_id,
            quantity: 1,
            selected_options: item.selected_options || {}
        }, {
            onSuccess: () => {
                message.success(`${t('wishlist:add_to_cart_success', 'Đã thêm vào giỏ hàng:')} ${item.name}`);
            },
            onError: (err) => {
                const errorMsg = err.response?.data?.message || 'Lỗi khi thêm vào giỏ hàng';
                if (errorMsg.includes('Vui lòng chọn')) {
                    message.warning(errorMsg);
                    message.info(t('wishlist:redirect_to_pick', 'Đang chuyển đến trang chi tiết để chọn biến thể...'));
                    navigate(`/parts/${item.part_id}`);
                } else {
                    message.error(errorMsg);
                }
            },
            onSettled: () => {
                setIsAddingToCart(null);
            }
        });
    }, [t, addToCart, message, navigate]);

    const dispatch = useDispatch();

    const handleBuyNow = useCallback((item) => {
        if (item.options && item.options.length > 0) {
            message.info(t('wishlist:require_options', 'Vui lòng chọn biến thể để Mua Nhanh.'));
            navigate(`/parts/${item.part_id}`);
            return;
        }

        setIsBuyingNow(item.id);

        addToCart({
            part_id: item.part_id,
            quantity: 1,
            selected_options: item.selected_options || {}
        }, {
            onSuccess: () => {
                import('@/store/slices/cartSlice').then(({ isolateCheckedItem }) => {
                    dispatch(isolateCheckedItem(item.part_id));
                    message.success(t('wishlist:buy_now_processing', 'Đã thêm vào giỏ. Đang chuyển hướng...'));
                    navigate('/cart');
                });
            },
            onError: (err) => {
                const errorMsg = err.response?.data?.message || 'Lỗi khi xử lý Mua ngay';
                // Server-side Fallback Interceptor: Catch backend missing options validation
                if (errorMsg.includes('Vui lòng chọn')) {
                    message.warning(errorMsg);
                    message.info(t('wishlist:redirect_to_pick', 'Đang chuyển đến trang chi tiết để chọn biến thể...'));
                    navigate(`/parts/${item.part_id}`);
                } else {
                    message.error(errorMsg);
                }
            },
            onSettled: () => {
                setIsBuyingNow(null);
            }
        });
    }, [t, navigate, addToCart, message]);

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
