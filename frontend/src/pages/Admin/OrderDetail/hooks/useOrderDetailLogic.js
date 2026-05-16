import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOrders } from '../../../Shared/Profile/pages/OrderHistory/data/mockOrderData';

export const useOrderDetailLogic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Giả lập gọi API lấy chi tiết đơn hàng
        const fetchOrder = () => {
            setLoading(true);
            setTimeout(() => {
                const foundOrder = mockOrders.find(o => o.order_code === id);
                if (foundOrder) {
                    setOrder(foundOrder);
                } else {
                    // Xử lý không tìm thấy đơn hàng, quay lại trang trước
                    navigate('/admin/orders');
                }
                setLoading(false);
            }, 500); // 500ms delay to simulate network latency and show Skeleton
        };

        fetchOrder();
    }, [id, navigate]);

    const handleAction = (actionType) => {
        console.log("Action triggered:", actionType);
    };

    return {
        order,
        loading,
        handleAction
    };
};
