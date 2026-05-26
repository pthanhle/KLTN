import { RefreshCw, PackageCheck, Ban } from 'lucide-react';
import { Button } from 'antd';

export const OrderSummary = ({ financials, isPending, isShipping, handleCancelOrder, handleConfirmReceipt, handleReorder, formatCurrency, t }) => {
    return (
        <section className="flex flex-col md:flex-row gap-8 items-start justify-between" data-purpose="footer-summary">
            {/* Re-order Actions */}
            <div className="w-full md:flex-grow flex flex-col sm:flex-row flex-wrap md:flex-col lg:flex-row items-stretch sm:items-start h-full pt-2 sm:pt-4 gap-4">
                <Button onClick={handleReorder} className="w-full md:w-auto !h-auto !py-3.5 !px-8 !bg-yellow-500 !text-slate-900 !font-extrabold !rounded-2xl !shadow-[0_8px_20px_rgba(234,179,8,0.25)] hover:!bg-yellow-400 hover:!scale-[1.02] active:!scale-95 transition-all flex items-center justify-center gap-2 border-0">
                    <RefreshCw className="w-5 h-5" /> 
                    {t('order_dtl_reorder', 'Mua lại Đơn Hàng này')}
                </Button>

                {isShipping && (
                    <Button 
                        onClick={handleConfirmReceipt}
                        className="w-full md:w-auto !h-auto !py-3.5 !px-8 !bg-slate-900 dark:!bg-white !text-white dark:!text-slate-900 !font-black !rounded-2xl hover:!scale-[1.02] active:!scale-95 transition-all flex items-center justify-center gap-2 shadow-xl border-0"
                    >
                        <PackageCheck className="w-5 h-5" /> 
                        {t('order_btn_confirm_receive', 'Đã Nhận Được Hàng')}
                    </Button>
                )}

                {isPending && (
                    <Button 
                        onClick={handleCancelOrder}
                        className="w-full md:w-auto !h-auto !py-3.5 !px-8 !bg-transparent !border-2 !border-slate-200 dark:!border-white/10 !text-slate-500 dark:!text-slate-400 !font-bold !rounded-2xl hover:!bg-red-50 hover:!border-red-100 hover:!text-red-500 dark:hover:!bg-red-900/20 dark:hover:!border-red-900/30 transition-all flex items-center justify-center gap-2 mt-4 shadow-none"
                    >
                        <Ban className="w-5 h-5" /> 
                        {t('order_btn_cancel', 'Hủy Đơn Hàng')}
                    </Button>
                )}
            </div>
            
            {/* Financial Breakdown Card */}
            <div className="w-full md:w-[400px] lg:w-[440px] flex-shrink-0 bg-white dark:bg-[#141416] rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-white/5 space-y-4" data-purpose="breakdown-card">
                <div className="space-y-3">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium text-sm">
                        <span>{t('order_sum_subtotal', 'Tạm tính')}</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{formatCurrency(financials.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium text-sm">
                        <span>{t('order_sum_shipping', 'Phí vận chuyển')}</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{formatCurrency(financials.shipping_fee)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium text-sm">
                        <span>{t('order_sum_discount', 'Khuyến mãi')}</span>
                        <span className="text-red-500 font-semibold">-{formatCurrency(financials.discount)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium text-sm">
                        <span>{t('order_sum_vat', 'Thuế VAT (8%)')}</span>
                        <span className="text-slate-900 dark:text-white font-semibold">{formatCurrency(financials.vat)}</span>
                    </div>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-row justify-between items-end gap-4">
                    <span className="text-lg font-bold text-slate-900 dark:text-white whitespace-nowrap mb-1">{t('order_sum_total', 'Tổng cộng')}</span>
                    <div className="text-right flex-shrink-0">
                        <span className="text-2xl lg:text-3xl font-black text-yellow-500 tracking-tighter">
                            {formatCurrency(financials.grand_total)}
                        </span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                            {t('order_sum_tax_incl', 'Đã bao gồm thuế')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderSummary;
