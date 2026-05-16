import React from 'react';
import { formatCurrency } from '../../Orders/utils/formatters';

export const FinancialSummary = ({ financials, payment, t }) => {
    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 flex flex-col items-end">
            <div className="w-full max-w-md space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-slate-500 dark:text-[#d3c5ac]">
                    <span>{t('subtotal')}</span>
                    <span>{formatCurrency(financials?.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-500 dark:text-[#d3c5ac]">
                    <span>{t('shipping_fee')}</span>
                    <span>{formatCurrency(financials?.shipping_fee || 0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-500 dark:text-[#d3c5ac]">
                    <span>{t('vat_fee')}</span>
                    <span>{formatCurrency(financials?.vat || 0)}</span>
                </div>
                {financials?.discount > 0 && (
                    <div className="flex justify-between items-center text-sm font-bold text-red-600 dark:text-red-500">
                        <span>{t('discount')}</span>
                        <span>- {formatCurrency(financials.discount)}</span>
                    </div>
                )}
                
                <div className="h-px bg-slate-200 dark:bg-white/10 my-4 w-full"></div>
                
                <div className="flex justify-between items-center w-full mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                        {t('grand_total')}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                        payment?.status === 'PAID' 
                            ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 border-green-200 dark:border-green-500/30' 
                            : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/30'
                    }`}>
                        {payment?.status}
                    </span>
                </div>
                
                <div className="flex justify-end w-full mt-2">
                    <span className="text-4xl font-extrabold text-yellow-600 dark:text-yellow-500 tracking-tight drop-shadow-sm">
                        {formatCurrency(financials?.grand_total || 0)}
                    </span>
                </div>
            </div>
        </section>
    );
};
