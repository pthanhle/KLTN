import { Button, Image, Tag } from 'antd';
import { Headset, ArrowLeft, X } from 'lucide-react';
import PromoCodeInput from '../Shared/PromoCodeInput';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

const PaymentSummary = ({
    checkedItems,
    subtotal,
    discount = 0,
    appliedVoucher,
    removeVoucher,
    isLoading,
    handleCheckoutSubmit,
    methods,
    applyPromoCode,
    isValidatingVoucher,
    onBack,
    t
}) => {
    const shippingFee = 0;
    const tax = subtotal * 0.1;
    const finalTotal = subtotal + shippingFee - discount + tax;

    return (
        <aside className="sticky top-24 space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white dark:bg-[#141416] p-8 rounded-3xl shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5">
                <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-slate-900 dark:text-white">{t('summary_title')}</h3>

                <div className="space-y-6 mb-8 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                    {checkedItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 shrink-0 flex items-center justify-center">
                                <Image src={item.image} alt={item.name} preview={true} className="w-full h-full object-cover" rootClassName="w-full h-full" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate" title={item.name}>{item.name}</h4>
                                {item.selected_options && Object.keys(item.selected_options).length > 0 && (
                                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                        {Object.entries(item.selected_options).map(([k, v]) => (
                                            <div key={k} className="flex items-center gap-1.5 pl-1.5 pr-2 py-0.5 rounded text-[9px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                                <span className="font-bold text-slate-400 uppercase tracking-wider">{k}</span>
                                                <div className="w-[3px] h-[3px] rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('summary_quantity', { count: String(item.quantity).padStart(2, '0') })}</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {formatVND(item.price)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-px bg-slate-100 dark:bg-white/10 mb-5"></div>

                {/* Voucher applied */}
                {appliedVoucher ? (
                    <div className="mb-5 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Tag color="gold" className="m-0 font-bold text-xs">
                                        {appliedVoucher.code}
                                    </Tag>
                                </div>
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                                    {appliedVoucher.title}
                                </p>
                            </div>
                            <button
                                onClick={removeVoucher}
                                className="shrink-0 p-1.5 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-500/20 text-slate-500 dark:text-slate-400 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <PromoCodeInput
                        applyPromoCode={applyPromoCode}
                        isLoading={isValidatingVoucher}
                        t={t}
                        className="mb-5"
                    />
                )}

                <div className="h-px bg-slate-100 dark:bg-white/10 mb-5"></div>

                <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>{t('summary_subtotal_short')}</span>
                        <span className="text-slate-900 dark:text-white font-bold">{formatVND(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>{t('summary_shipping')}</span>
                        <span className="text-emerald-500 font-bold">{t('summary_shipping_free')}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                            <span>{t('summary_discount', 'Giảm giá')}</span>
                            <span className="text-rose-500 font-bold">- {formatVND(discount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>{t('summary_tax_real')}</span>
                        <span className="text-slate-900 dark:text-white font-bold">{formatVND(tax)}</span>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-white/10 my-4"></div>

                    <div className="flex justify-between items-end">
                        <span className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t('summary_total', 'Tổng cộng')}</span>
                        <span className="text-3xl font-black text-yellow-500 tracking-tighter">
                            {formatVND(finalTotal)}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        type="primary"
                        onClick={methods.handleSubmit((data) => handleCheckoutSubmit({ ...data, finalTotal }))}
                        loading={isLoading}
                        className="w-full !h-auto !py-5 bg-yellow-500 hover:!bg-yellow-600 text-slate-900 font-black uppercase tracking-widest rounded-full shadow-xl shadow-yellow-500/30 transition-all active:scale-[0.98] border-none text-[15px]"
                    >
                        {t('summary_checkout', 'Xác nhận & Đặt hàng')}
                    </Button>

                    <Button
                        type="default"
                        onClick={onBack}
                        disabled={isLoading}
                        icon={<ArrowLeft size={16} />}
                        className="w-full !h-auto !py-4 bg-transparent hover:!bg-slate-50 dark:hover:!bg-white/5 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest rounded-full transition-all border border-slate-200 dark:border-white/10 text-[13px] flex items-center justify-center gap-2"
                    >
                        {t('summary_back', 'Quay lại giỏ hàng')}
                    </Button>
                </div>
            </div>

            <div className="bg-slate-900 dark:bg-white/5 p-6 rounded-3xl text-white">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl shrink-0">
                        <Headset className="text-yellow-500" size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">{t('support_title')}</h4>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{t('support_desc')}</p>
                        <a href="tel:19001234" className="inline-block mt-3 text-yellow-500 font-bold text-[11px] uppercase tracking-widest hover:text-yellow-400 transition-colors">
                            {t('support_call')}
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default PaymentSummary;
