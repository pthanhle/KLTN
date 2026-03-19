import { Button } from 'antd';
import { ShieldCheck } from 'lucide-react';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

const CartSummary = ({ subtotal, hasCheckedItems, checkedCount, proceedToPayment, t }) => {
    return (
        <div className="sticky top-24 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="bg-white dark:bg-[#141416] rounded-3xl p-8 shadow-sm dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5">
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-tight">{t('summary_title', 'Order Summary')}</h2>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                        <span>{t('summary_subtotal', { count: checkedCount || 0 })}</span>
                        <span className="text-slate-900 dark:text-white font-bold">{formatVND(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                        <span>{t('summary_shipping', 'Shipping')}</span>
                        <span className="italic text-slate-400 dark:text-slate-500">{t('summary_shipping_calc', 'Calculated at checkout')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                        <span>{t('summary_tax', 'Tax')}</span>
                        <span className="font-bold text-emerald-500">- 0 đ</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 mb-8">
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('summary_total', 'Total Amount')}</span>
                            <div className="text-3xl font-black text-yellow-500 leading-none mt-2">
                                {formatVND(subtotal)}
                            </div>
                        </div>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pb-1">{t('summary_vat_included', 'VAT included')}</span>
                    </div>
                </div>

                <Button 
                    type="primary"
                    onClick={proceedToPayment}
                    disabled={!hasCheckedItems}
                    className="w-full !h-auto !py-5 bg-yellow-500 hover:!bg-yellow-600 disabled:!bg-slate-100 dark:disabled:!bg-white/5 disabled:!text-slate-400 text-slate-900 font-black rounded-2xl transition-all shadow-lg shadow-yellow-500/20 disabled:shadow-none active:scale-[0.98] disabled:active:scale-100 uppercase tracking-widest text-sm border-none"
                >
                    {t('summary_proceed', 'Proceed to Checkout')}
                </Button>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 opacity-60 text-slate-500 dark:text-slate-400">
                            <ShieldCheck size={18} strokeWidth={2.5}/>
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t('trust_secure', '100% Secure Checkout')}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap items-center justify-center opacity-70 grayscale">
                            {['VISA', 'MC', 'VNPAY', 'MOMO', 'COD'].map(method => (
                                <div key={method} className="h-6 px-3 bg-white dark:bg-[#0a0a0b] rounded text-[9px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 flex items-center justify-center uppercase">
                                    {method}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20 rounded-2xl p-4 flex gap-3 items-start backdrop-blur-sm">
                <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 font-bold text-[10px] mt-0.5 pt-[1px]">!</div>
                <p className="text-xs text-yellow-800 dark:text-yellow-500/90 leading-relaxed font-medium">
                    {t('summary_free_shipping_notice', 'Miễn phí giao hàng toàn quốc trên 100.000.000 đ. Áp dụng cho mặt hàng phụ tùng tiêu chuẩn. Phụ thu hàng Cồng Kềnh tính riêng.')}
                </p>
            </div>
        </div>
    );
};

export default CartSummary;
