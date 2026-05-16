import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOrders } from '../../../Shared/Profile/pages/OrderHistory/data/mockOrderData';
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

    useEffect(() => {
        const fetchOrder = () => {
            setLoading(true);
            setTimeout(() => {
                const foundOrder = mockOrders.find(o => o.order_code === id);
                if (foundOrder) {
                    try {
                        const validatedOrder = orderDetailSchema.parse(foundOrder);
                        setOrder(validatedOrder);
                    } catch (error) {
                        console.error('Data validation failed:', error);
                        // Xử lý fallback an toàn nhất
                        setOrder(orderDetailSchema.parse({ order_code: id }));
                    }
                } else {
                    // Xử lý không tìm thấy đơn hàng, quay lại trang trước
                    navigate('/admin/orders');
                }
                setLoading(false);
            }, 500); // 500ms delay to simulate network latency and show Skeleton
        };

        fetchOrder();
    }, [id, navigate]);

    const addActivityLog = (status, note, actor = 'Admin (Demo)') => {
        const newLog = {
            status,
            timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
            actor,
            note
        };
        setOrder(prev => ({
            ...prev,
            order_status: status,
            activity_log: [newLog, ...(prev.activity_log || [])]
        }));
    };

    const handleAction = async (actionType) => {
        try {
            switch (actionType) {
                case 'cancel_order':
                    setIsCancelModalVisible(true);
                    break;
                case 'approve_order':
                    addActivityLog('CONFIRMED', 'Đã duyệt đơn hàng');
                    break;
                case 'pack_order':
                    addActivityLog('PACKED', 'Đã đóng gói xong, chờ lấy hàng.');
                    break;
                case 'print_order':
                    setIsPrintModalVisible(true);
                    break;
                case 'ship_order':
                    setIsShippingModalVisible(true);
                    break;
                case 'complete_order':
                    addActivityLog('COMPLETED', 'Đã giao hàng thành công');
                    break;
                default:
                    console.log('Unknown action', actionType);
            }
        } catch (err) {
            console.error('Error performing action:', err);
        }
    };

    const handleShippingSubmit = (data) => {
        console.log('Shipping Data:', data);
        setOrder(prev => ({
            ...prev,
            order_status: 'SHIPPING',
            shipping: {
                ...prev.shipping,
                provider: data.provider,
                tracking_code: data.tracking_code,
                estimated_delivery: data.estimated_delivery
            },
            activity_log: [
                {
                    status: 'SHIPPING',
                    timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
                    actor: 'Admin (Demo)',
                    note: `Bàn giao ĐVVC: ${data.provider} - Mã: ${data.tracking_code}`
                },
                ...(prev.activity_log || [])
            ]
        }));
        setIsShippingModalVisible(false);
    };

    const handleCancelSubmit = (data) => {
        console.log('Cancel Data:', data);
        setOrder(prev => ({
            ...prev,
            order_status: 'CANCELLED',
            cancel_reason: data.cancel_reason,
            activity_log: [
                {
                    status: 'CANCELLED',
                    timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
                    actor: 'Admin (Demo)',
                    note: `Hủy đơn: ${data.cancel_reason}. (Simulated BE: allocated -1, available_stock +1)`
                },
                ...(prev.activity_log || [])
            ]
        }));
        setIsCancelModalVisible(false);
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
