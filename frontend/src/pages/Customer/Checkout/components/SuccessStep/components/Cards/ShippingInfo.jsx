import { MapPin } from 'lucide-react';

const ShippingInfo = ({ customerName, customerPhone, address, shippingMethod, deliveryEst, t }) => {
    return (
        <div className="bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5 flex-1">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-white/5">
                <div className="w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-yellow-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    {t('success_shipping_info')}
                </h3>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-50 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold">{t('success_receiver')}</span>
                    <span className="col-span-2 font-bold text-slate-900 dark:text-white text-sm text-right">{customerName}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-50 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold">{t('success_phone')}</span>
                    <span className="col-span-2 font-bold text-slate-900 dark:text-white text-sm text-right">{customerPhone}</span>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-4 pb-4 border-b border-slate-50 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold">{t('success_address')}</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm text-right leading-relaxed">{address}</span>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-4 pt-4">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold mt-1">{t('success_shipping_method')}</span>
                    <div className="text-right flex flex-col items-end">
                        <span className="font-bold text-slate-900 dark:text-white text-sm mb-1">{shippingMethod}</span>
                        <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded">
                            {t('success_delivery_est', { date: deliveryEst || '15/11 - 18/11' })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;
