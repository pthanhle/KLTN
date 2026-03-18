const OrderDetails = ({ orderData, t }) => {
    if (!orderData) return null;
    return (
        <div className="bg-white dark:bg-[#141416] p-6 sm:p-8 rounded-3xl shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-6">Thông tin đơn hàng</h3>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('success_order_id', 'Mã đơn hàng')}</span>
                <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-md text-sm">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('success_order_date', 'Ngày đặt')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderData.orderDate}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('success_total', 'Tổng thanh toán')}</span>
                <span className="font-black text-yellow-500 text-lg tracking-tighter">{new Intl.NumberFormat('vi-VN').format(orderData.total || 0)} đ</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('success_payment_method', 'Thanh toán')}</span>
                <span className="font-bold text-slate-900 dark:text-white text-right max-w-[200px] truncate" title={orderData.paymentMethod}>{orderData.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('success_shipping_method', 'Vận chuyển')}</span>
                <span className="font-bold text-emerald-500 dark:text-emerald-400">{orderData.shippingMethod}</span>
            </div>
        </div>
    );
};

export default OrderDetails;
