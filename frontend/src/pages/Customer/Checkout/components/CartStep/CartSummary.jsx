import { Input, Button } from 'antd';
import { ShieldCheck } from 'lucide-react';

const CartSummary = ({ subtotal, hasCheckedItems, proceedToPayment, applyPromoCode, t }) => {
    return (
        <div className="sticky top-24 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="bg-white dark:bg-[#141416] rounded-3xl p-8 shadow-sm dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5">
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-tight">{t('summary_title', 'Order Summary')}</h2>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                        <span>{t('summary_subtotal', 'Subtotal')}</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                            {new Intl.NumberFormat('vi-VN').format(subtotal)} đ
                        </span>
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

                <div className="mb-6">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t('summary_promo_label', 'Promo Code')}</label>
                    <div className="flex gap-2">
                        <Input 
                            placeholder={t('summary_promo_placeholder', 'Enter code...')}
                            className="!h-[44px] !rounded-xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[14px] !font-medium !text-slate-900 dark:!text-white transition-all placeholder:!text-slate-400"
                        />
                        <Button 
                            type="primary"
                            onClick={() => applyPromoCode('TT-SUMMER-24')} 
                            className="h-[44px] px-5 bg-slate-900 border-none dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm hover:!bg-slate-800 dark:hover:!bg-slate-200 transition-all shrink-0 shadow-none hover:shadow-none"
                        >
                            {t('summary_apply', 'Apply')}
                        </Button>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 mb-8">
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('summary_total', 'Total Amount')}</span>
                            <div className="text-3xl font-black text-yellow-500 leading-none mt-2">
                                {new Intl.NumberFormat('vi-VN').format(subtotal)} đ
                            </div>
                        </div>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pb-1">{t('summary_vat_included', 'VAT included')}</span>
                    </div>
                </div>

                <Button 
                    type="primary"
                    onClick={proceedToPayment}
                    disabled={!hasCheckedItems}
                    className="w-full h-14 bg-yellow-500 hover:!bg-yellow-600 disabled:!bg-slate-100 dark:disabled:!bg-white/5 disabled:!text-slate-400 text-slate-900 font-black rounded-xl transition-all shadow-lg shadow-yellow-500/20 disabled:shadow-none active:scale-[0.98] disabled:active:scale-100 uppercase tracking-widest text-sm border-none"
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
            
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-4 flex gap-3 items-start backdrop-blur-sm">
                <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-500/20 text-blue-500 font-bold text-xs mt-0.5">!</div>
                <p className="text-xs text-blue-700 dark:text-blue-300/80 leading-relaxed font-medium">
                    Miễn phí giao hàng toàn quốc trên 100.000.000 đ. Áp dụng cho các mặt hàng phụ tùng tiêu chuẩn. Phụ thu hàng Cồng Kềnh sẽ tính riêng.
                </p>
            </div>
        </div>
    );
};

export default CartSummary;
