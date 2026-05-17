import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { useAddToCart } from '@/services/queries/clientCart.queries';
import { useToggleWishlist, useGetWishlist } from '@/services/queries/clientWishlist.queries';

export const usePartCardLogic = (part) => {
    const { t } = useTranslation('parts');
    const navigate = useNavigate();
    const { message } = App.useApp();

    const availableStock = part?.inventory?.available_stock ?? part?.stock ?? 0;
    const isOutOfStock = availableStock <= 0;

    const { data: wishlistData } = useGetWishlist();
    const isWishlisted = (wishlistData?.data?.items || []).some(item => String(item.part_id) === String(part.id));

    const { mutate: toggleWishlistApi } = useToggleWishlist();
    const { mutate: addToCartApi, isPending: isAddingToCart } = useAddToCart();

    const handleCardClick = () => {
        navigate(`/parts/${part.id}`);
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleWishlistApi(part.id, {
            onSuccess: () => {
                if (isWishlisted) {
                    message.info(t('wishlist_removed', `Đã xóa ${part.name} khỏi danh sách yêu thích.`));
                } else {
                    message.success(t('wishlist_added', `Đã thêm ${part.name} vào danh sách yêu thích!`));
                }
            },
            onError: (err) => {
                message.error(err.response?.data?.message || t('action_error', 'Có lỗi xảy ra khi cập nhật Yêu thích'));
            }
        });
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock) return;
        
        if (part.options && part.options.length > 0) {
            message.info(t('require_options', 'Vui lòng chọn biến thể trước khi thêm vào giỏ.'));
            navigate(`/parts/${part.id}`);
            return;
        }

        addToCartApi({
            part_id: part.id,
            quantity: 1,
            selected_options: {}
        }, {
            onSuccess: () => {
                message.success(t('cart_added', `Đã thêm ${part.name} vào Giỏ hàng!`));
            },
            onError: (err) => {
                message.error(err.response?.data?.message || t('action_error', 'Có lỗi xảy ra khi thêm vào Giỏ hàng'));
            }
        });
    };

    const handlePreorder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/parts/pre-order/${part.id}`);
    };

    return {
        t,
        isOutOfStock,
        isWishlisted,
        isAddingToCart,
        handleCardClick,
        handleToggleWishlist,
        handleAddToCart,
        handlePreorder
    };
};
