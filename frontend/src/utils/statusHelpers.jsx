import { CheckCircle2, Truck, Ban, Clock } from 'lucide-react';

export const getOrderStatusConfig = (status, t) => {
    switch (status) {
        case 'COMPLETED':
            return { color: 'success', text: t ? t('order_stt_success', 'Thành công') : 'Thành công', icon: <CheckCircle2 size={14} className="mr-1" /> };
        case 'SHIPPING':
        case 'SHIPPED':
            return { color: 'processing', text: t ? t('order_stt_shipping', 'Đang giao') : 'Đang giao', icon: <Truck size={14} className="mr-1" /> };
        case 'CANCELLED':
            return { color: 'error', text: t ? t('order_stt_cancelled', 'Đã hủy') : 'Đã hủy', icon: <Ban size={14} className="mr-1" /> };
        default:
            return { color: 'warning', text: t ? t('order_stt_pending', 'Chờ xử lý') : 'Chờ xử lý', icon: <Clock size={14} className="mr-1" /> };
    }
};
