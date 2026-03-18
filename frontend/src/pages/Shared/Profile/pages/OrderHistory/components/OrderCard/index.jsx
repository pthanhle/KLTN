import { Tag, Button, Tooltip } from 'antd';
import { Download, Navigation } from 'lucide-react';
import { useOrderCard } from '../../hooks/useOrderCard';
import OrderItemList from './OrderItemList';
import { Link } from 'react-router-dom';

const OrderCard = ({ order, t }) => {
    const { statusConfig, formatCurrency, isPending, isShipping, isPaid, isUnpaid } = useOrderCard(order, t);

    return (
        <div className="bg-white dark:bg-[#141416] rounded-[24px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-white/5 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:border-white/10 group">
            {/* Card Header */}
            <div className="flex flex-wrap justify-between items-start mb-6 border-b border-slate-50 dark:border-white/5 pb-4">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        {t('order_id_lbl', 'Mã đơn hàng')}
                    </span>
                    <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{order.order_code}</p>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        {t('order_date_lbl', 'Ngày đặt')}: {order.order_date}
                    </p>
                </div>
                <Tag color={statusConfig.color} className="flex items-center px-3 py-1.5 rounded-full text-xs font-bold border-0 shadow-sm m-0">
                    {statusConfig.icon}
                    {statusConfig.text}
                </Tag>
            </div>

            {/* Item List Component */}
            <OrderItemList items={order.items} t={t} formatCurrency={formatCurrency} />

            {/* Card Footer */}
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5 gap-4">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">
                        {t('order_total_lbl', 'Tổng thanh toán')}
                    </p>
                    <p className="text-[20px] font-black text-slate-900 dark:text-white">
                        {formatCurrency(order.total_amount)}
                    </p>
                    {isPaid ? (
                        <p className="text-[11px] text-green-500 font-bold mt-1 uppercase tracking-wider">
                            {t('order_paid_msg', 'Đã thanh toán')} ({t(`pay_method_${order.payment_method?.toLowerCase()}`, order.payment_method)})
                        </p>
                    ) : (
                        <p className="text-[11px] text-orange-500 font-bold mt-1 uppercase tracking-wider">
                            {t('order_unpaid_msg', 'Chờ thanh toán')} ({t(`pay_method_${order.payment_method?.toLowerCase()}`, order.payment_method)})
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    {order.invoice_url && (
                        <Tooltip title={t('order_btn_invoice', 'Xuất Hóa đơn VAT')}>
                            <Button
                                type="text"
                                className="!h-10 !w-10 !px-0 !rounded-full !text-slate-400 hover:!text-yellow-600 hover:!bg-yellow-50 dark:hover:!bg-yellow-500/10 transition-colors"
                            >
                                <Download size={18} />
                            </Button>
                        </Tooltip>
                    )}

                    {isShipping && order.tracking_info && (
                        <Tooltip title={`${order.tracking_info.provider} - ${order.tracking_info.tracking_code}`}>
                            <Button
                                type="text"
                                className="!h-10 !px-4 !rounded-full !text-blue-500 hover:!bg-blue-50 dark:hover:!bg-blue-500/10 transition-colors flex items-center gap-2 font-bold text-sm"
                            >
                                <Navigation size={16} /> {t('order_btn_track', 'Theo dõi đơn')}
                            </Button>
                        </Tooltip>
                    )}

                    {isPending && (
                        <Button
                            className="!h-10 !px-6 !rounded-full !border-slate-200 dark:!border-white/10 !text-sm !font-bold !text-slate-600 dark:!text-slate-300 hover:!bg-slate-50 hover:dark:!bg-white/5 transition-colors shadow-none"
                        >
                            {t('order_btn_cancel', 'Hủy đơn')}
                        </Button>
                    )}
                    <Link to={`/profile/orders/${order.order_code}`} className="block">
                        <Button
                            className="!h-10 !px-6 !rounded-full !border-slate-200 dark:!border-white/10 !text-sm !font-bold !text-slate-600 dark:!text-slate-300 hover:!bg-slate-50 hover:dark:!bg-white/5 transition-colors shadow-none"
                        >
                            {t('order_btn_detail', 'Xem chi tiết')}
                        </Button>
                    </Link>
                    {isUnpaid && !isShipping && order.order_status !== 'COMPLETED' ? (
                        <Button
                            type="primary"
                            className="!h-10 !px-6 !rounded-full !bg-yellow-500 !text-slate-900 !text-sm !font-black hover:!bg-yellow-400 disabled:!bg-yellow-500/50 shadow-[0_4px_12px_rgba(234,179,8,0.2)] border-0 transition-colors"
                        >
                            {t('order_btn_pay', 'Thanh toán ngay')}
                        </Button>
                    ) : (
                        <Button
                            className="!h-10 !px-6 !rounded-full !bg-slate-900 dark:!bg-white !text-white dark:!text-slate-900 !text-sm !font-bold hover:opacity-90 border-0 transition-colors shadow-none mx-[-2]"
                        >
                            {t('order_btn_track', 'Theo dõi đơn')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
