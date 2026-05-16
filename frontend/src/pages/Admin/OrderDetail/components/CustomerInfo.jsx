import React from 'react';
import { User, Phone, AlertTriangle } from 'lucide-react';

export const CustomerInfo = ({ delivery, t }) => {
    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5">
            <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac] mb-6 flex items-center gap-2">
                <User size={16} /> {t('customer_delivery')}
            </h2>
            <div className="space-y-6">
                <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {delivery?.receiver_name || t('guest_customer')}
                    </p>
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500 flex items-center gap-2">
                        <Phone size={14} /> {delivery?.phone}
                    </p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-2">
                        {t('delivery_address')}
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-[#dce1fb] leading-relaxed">
                        {delivery?.address}
                    </p>
                </div>
                {delivery?.note && (
                    <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4 mt-2">
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-500 flex items-start gap-2">
                            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                            <span><strong>{t('note_warning')}</strong> {delivery.note}</span>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};
