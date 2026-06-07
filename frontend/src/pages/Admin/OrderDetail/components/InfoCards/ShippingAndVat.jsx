import React from 'react';
import { Truck, FileText, Copy } from 'lucide-react';
import { getShippingMethodConfig } from '../../constants/shippingMethods';

export const ShippingInfo = ({ shipping, status, t }) => {
    const isShipped = ['SHIPPED', 'SHIPPING', 'DELIVERED', 'COMPLETED'].includes(status);

    return (
        <section className={`bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac] flex items-center gap-2">
                    <Truck size={16} /> {t('shipping_info')}
                </h2>
                {!isShipped && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 border border-slate-200 dark:border-white/10 px-2 py-1 rounded-md">
                        {t(`status_${status?.toLowerCase()}`, status)}
                    </span>
                )}
            </div>
            
            <div className="space-y-4">
                {shipping?.method && (() => {
                    const config = getShippingMethodConfig(shipping.method);
                    return (
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t('shipping_method', 'Phương thức')}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {shipping.method}
                                {config?.isPriority && (
                                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                                        {t('shipping_priority_badge')}
                                    </span>
                                )}
                            </p>
                        </div>
                    );
                })()}
                
                {isShipped ? (
                    <>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t('shipping_provider')}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{shipping?.provider}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t('tracking_code')}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-yellow-600 dark:text-yellow-500">{shipping?.tracking_code}</p>
                                <button className="text-slate-400 hover:text-yellow-600 transition-colors">
                                    <Copy size={14} />
                                </button>
                            </div>
                        </div>
                        {shipping?.estimated_delivery && (
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t('estimated_delivery')}</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                    {typeof shipping.estimated_delivery === 'string' 
                                        ? shipping.estimated_delivery 
                                        : shipping.estimated_delivery.format('DD/MM/YYYY')}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-lg border border-dashed border-slate-200 dark:border-white/10">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic text-center">
                            {t('shipping_empty')}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export const VatInfo = ({ vatInfo, t }) => {
    if (!vatInfo) return null;

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden mt-8">
            <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-6 relative">
                <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac] flex items-center gap-2">
                    <FileText size={16} /> {t('vat_info')}
                </h2>
                <button className="text-slate-400 hover:text-yellow-600 transition-colors" title="Copy All">
                    <Copy size={16} />
                </button>
            </div>
            <div className="space-y-4 relative">
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t('company_name')}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{vatInfo.company_name}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t('tax_code')}</p>
                    <p className="text-sm font-extrabold tracking-wider text-yellow-600 dark:text-yellow-500">{vatInfo.tax_code}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t('company_address')}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-[#dce1fb] leading-relaxed">{vatInfo.company_address}</p>
                </div>
            </div>
        </section>
    );
};
