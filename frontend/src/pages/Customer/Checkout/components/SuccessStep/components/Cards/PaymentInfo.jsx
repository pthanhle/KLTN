import { CreditCard, Wallet, Banknote, QrCode } from 'lucide-react';

const PaymentInfo = ({ paymentMethod, cardTail, t }) => {
    return (
        <div className="bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-white/5">
                <div className="w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <CreditCard size={16} className="text-yellow-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    {t('success_payment_info')}
                </h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-10 bg-slate-50 dark:bg-white/5 rounded-lg shrink-0 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-sm">
                        {cardTail ? (
                            <CreditCard size={20} className="text-slate-600 dark:text-slate-400" strokeWidth={2} />
                        ) : paymentMethod?.includes('VNPay') ? (
                            <QrCode size={20} className="text-slate-600 dark:text-slate-400" strokeWidth={2} />
                        ) : paymentMethod?.includes('ngân hàng') ? (
                            <Wallet size={20} className="text-slate-600 dark:text-slate-400" strokeWidth={2} />
                        ) : (
                            <Banknote size={20} className="text-slate-600 dark:text-slate-400" strokeWidth={2} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{paymentMethod}</span>
                        {cardTail && (
                            <span className="text-[10px] text-slate-400 font-medium">
                                {t('success_payment_card_tail', { tail: cardTail })}
                            </span>
                        )}
                    </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-4 py-1.5 rounded-full tracking-widest uppercase whitespace-nowrap shrink-0 ml-2">
                    {t('success_payment_status')}
                </span>
            </div>
        </div>
    );
};

export default PaymentInfo;
