const CustomerDetails = ({ orderData, t }) => {
    if (!orderData) return null;
    return (
        <div className="bg-white dark:bg-[#141416] p-6 sm:p-8 rounded-3xl shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-6">{t('success_customer', 'Khách hàng')}</h3>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('checkout_fullname', 'Họ tên')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderData.customerName}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('checkout_phone', 'Số điện thoại')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderData.customerPhone}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('checkout_email', 'Email')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderData.customerEmail}</span>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-widest">{t('success_address', 'Địa chỉ nhận hàng')}</span>
                <p className="font-bold text-slate-900 dark:text-white leading-relaxed bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/10 text-sm">
                    {orderData.address}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t('success_delivery_est', 'Dự kiến giao hàng')}: <span className="text-slate-900 dark:text-white">{orderData.deliveryEst}</span>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
