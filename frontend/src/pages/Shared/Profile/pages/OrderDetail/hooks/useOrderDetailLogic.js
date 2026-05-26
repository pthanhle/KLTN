import { useTranslation } from 'react-i18next';
import { ClipboardList, ShieldCheck, Truck, Package } from 'lucide-react';
import { useGetOrderById, useCancelOrder, useConfirmReceipt } from '@/services/queries/checkoutQueries';
import { useAddToCart } from '@/services/queries/clientCart.queries';
import { getOrderStatusConfig } from '@/utils/statusHelpers';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useOrderDetailLogic = (orderId) => {
    const { t } = useTranslation('profile');
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: orderDetail, isLoading } = useGetOrderById(orderId);
    
    const cancelMutation = useCancelOrder();
    const confirmMutation = useConfirmReceipt();

    const formatCurrency = (amount) => {
        if (!amount) return '0 đ';
        return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        message.success(t('order_copy_success', 'Đã sao chép vào bộ nhớ tạm'));
    };

    const steps = [
        { key: 'PENDING', label: t('order_step_placed', 'Tạo Đơn'), icon: ClipboardList },
        { key: 'CONFIRMED', label: t('order_step_confirmed', 'Xác Nhận'), icon: ShieldCheck },
        { key: 'PROCESSING', label: t('order_step_processing', 'Đang Xử Lý / Đóng Gói'), icon: Package },
        { key: 'SHIPPING', label: t('order_step_transit', 'Đang Giao Hàng'), icon: Truck },
        { key: 'COMPLETED', label: t('order_step_delivered', 'Hoàn Tất'), icon: ShieldCheck },
    ];

    const getStatusIndex = (stt) => {
        if (stt === 'PENDING') return 0;
        if (stt === 'CONFIRMED') return 1;
        if (stt === 'PROCESSING' || stt === 'PACKED') return 2;
        if (stt === 'SHIPPING') return 3;
        if (stt === 'COMPLETED' || stt === 'DELIVERED') return 4;
        return 0;
    };

    const currentStepIndex = orderDetail ? getStatusIndex(orderDetail.order_status) : 0;

    const isPending = orderDetail?.order_status === 'PENDING';
    const isCompleted = orderDetail?.order_status === 'COMPLETED' || orderDetail?.order_status === 'DELIVERED';
    const isShipping = orderDetail?.order_status === 'SHIPPING';
    const isCancelled = orderDetail?.order_status === 'CANCELLED';

    const handleCancelOrder = () => {
        if (window.confirm(t('order_cancel_confirm', 'Bạn có chắc chắn muốn hủy đơn hàng này không?'))) {
            cancelMutation.mutate(orderDetail._id, {
                onSuccess: () => {
                    message.success(t('order_cancel_success', 'Hủy đơn hàng thành công'));
                    queryClient.invalidateQueries(['order', orderId]);
                    queryClient.invalidateQueries(['myOrders']);
                },
                onError: (error) => {
                    message.error(error.response?.data?.message || t('order_cancel_failed', 'Có lỗi xảy ra khi hủy đơn'));
                }
            });
        }
    };

    const handleConfirmReceipt = () => {
        if (window.confirm(t('order_confirm_receipt_prompt', 'Xác nhận bạn đã nhận được hàng và hài lòng với sản phẩm?'))) {
            confirmMutation.mutate(orderDetail._id, {
                onSuccess: () => {
                    message.success(t('order_confirm_success', 'Đã xác nhận nhận hàng'));
                    queryClient.invalidateQueries(['order', orderId]);
                    queryClient.invalidateQueries(['myOrders']);
                },
                onError: (error) => {
                    message.error(error.response?.data?.message || t('order_confirm_failed', 'Có lỗi xảy ra'));
                }
            });
        }
    };

    const addToCartMutation = useAddToCart();
    
    const handleReorder = () => {
        if (!orderDetail || !orderDetail.items) return;
        
        let successCount = 0;
        
        // Push all items to cart
        Promise.all(orderDetail.items.map(item => 
            addToCartMutation.mutateAsync({
                part_id: item.part_id,
                quantity: item.quantity
            }).then(() => { successCount++ }).catch(e => console.error(e))
        )).finally(() => {
            if (successCount > 0) {
                message.success(t('reorder_success', `Đã thêm ${successCount} sản phẩm vào giỏ hàng`));
                navigate('/cart');
            } else {
                message.error(t('reorder_failed', 'Không thể thêm sản phẩm vào giỏ hàng'));
            }
        });
    };

    const handleReview = (itemId) => console.log('Đánh giá', itemId);

    const statusConfig = getOrderStatusConfig(orderDetail?.order_status, t);

    return {
        t,
        orderDetail,
        statusConfig,
        formatCurrency,
        handleCopy,
        steps,
        currentStepIndex,
        isPending,
        isCompleted,
        isShipping,
        isCancelled,
        handleCancelOrder,
        handleConfirmReceipt,
        handleReview,
        handleReorder,
        isLoading
    };
};
