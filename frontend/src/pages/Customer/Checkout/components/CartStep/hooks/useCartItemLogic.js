import { App } from 'antd';
import { useToggleWishlist, useGetWishlist } from '@/services/queries/clientWishlist.queries';
import { calculateStockStatus } from '../utils/inventoryUtils';

export const useCartItemLogic = (item, t) => {
    const { message } = App.useApp();
    const { data: wishlistData } = useGetWishlist();
    const { mutate: toggleWishlistApi } = useToggleWishlist();
    
    // Calculate accurate stock status using pure functions
    const stockStatus = calculateStockStatus(item);

    const isWishlisted = (wishlistData?.data?.items || []).some(
        wishItem => String(wishItem.part_id) === String(item.part_id)
    );

    const handleToggleWishlist = () => {
        toggleWishlistApi(item.part_id, {
            onSuccess: () => {
                if (isWishlisted) {
                    message.info(t('wishlist_removed', 'Đã xóa khỏi danh sách yêu thích'));
                } else {
                    message.success(t('wishlist_added', 'Đã thêm vào yêu thích'));
                }
            },
            onError: (err) => {
                message.error(err.response?.data?.message || t('action_error', 'Có lỗi xảy ra khi cập nhật Yêu thích'));
            }
        });
    };

    return {
        isWishlisted,
        handleToggleWishlist,
        ...stockStatus
    };
};
