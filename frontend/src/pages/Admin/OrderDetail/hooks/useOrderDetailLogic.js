import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { adminOrderApi } from '@/services/api/adminOrder.api';
import { orderDetailSchema } from '../schemas/orderDetailSchema';

export const useOrderDetailLogic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isShippingModalVisible, setIsShippingModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);

    const fetchOrder = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await adminOrderApi.getOrderById(id);
            try {
                const validatedOrder = orderDetailSchema.parse(data);
                setOrder(validatedOrder);
            } catch (validationError) {
                console.error('Data validation failed:', validationError);
                setOrder(data);
            }
        } catch (err) {
            console.error('Failed to fetch order:', err);
            if (err.response?.status === 404) {
                message.error('Đơn hàng không tồn tại');
                navigate('/admin/orders');
            } else {
                setError('Không thể tải thông tin đơn hàng');
                message.error('Không thể tải thông tin đơn hàng');
            }
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id, fetchOrder]);

    const handleAction = async (actionType) => {
        try {
            switch (actionType) {
                case 'cancel_order':
                    setIsCancelModalVisible(true);
                    break;
                case 'approve_order':
                    await adminOrderApi.updateOrder(id, { order_status: 'CONFIRMED' });
                    message.success('Đã duyệt đơn hàng');
                    await fetchOrder();
                    break;
                case 'pack_order':
                    await adminOrderApi.updateOrder(id, { order_status: 'PROCESSING' });
                    message.success('Đã chuyển trạng thái đóng gói');
                    await fetchOrder();
                    break;
                case 'print_order':
                    setIsPrintModalVisible(true);
                    break;
                case 'ship_order':
                    setIsShippingModalVisible(true);
                    break;
                case 'complete_order':
                    await adminOrderApi.updateOrder(id, { order_status: 'COMPLETED' });
                    message.success('Đã hoàn tất đơn hàng');
                    await fetchOrder();
                    break;
                default:
                    console.log('Unknown action', actionType);
            }
        } catch (err) {
            console.error('Error performing action:', err);
            const errorMsg = err.response?.data?.message || 'Thao tác thất bại';
            message.error(errorMsg);
        }
    };

    const handleShippingSubmit = async (data) => {
        try {
            await adminOrderApi.updateOrder(id, {
                order_status: 'SHIPPED',
                tracking_info: {
                    provider: data.provider,
                    tracking_code: data.tracking_code,
                }, 
            });
            message.success('Đã cập nhật thông tin vận chuyển');
            setIsShippingModalVisible(false);
            await fetchOrder();
        } catch (err) {
            console.error('Error updating shipping:', err);
            const errorMsg = err.response?.data?.message || 'Cập nhật vận chuyển thất bại';
            message.error(errorMsg);
        }
    };

    const handleCancelSubmit = async (data) => {
        try {
            await adminOrderApi.updateOrder(id, {
                order_status: 'CANCELLED',
            });
            message.success('Đã hủy đơn hàng');
            setIsCancelModalVisible(false);
            await fetchOrder();
        } catch (err) {
            console.error('Error cancelling order:', err);
            const errorMsg = err.response?.data?.message || 'Hủy đơn hàng thất bại';
            message.error(errorMsg);
        }
    };

    return {
        order,
        loading,
        error,
        handleAction,
        isShippingModalVisible,
        setIsShippingModalVisible,
        handleShippingSubmit,
        isCancelModalVisible,
        setIsCancelModalVisible,
        handleCancelSubmit,
        isPrintModalVisible,
        setIsPrintModalVisible
    };
};
