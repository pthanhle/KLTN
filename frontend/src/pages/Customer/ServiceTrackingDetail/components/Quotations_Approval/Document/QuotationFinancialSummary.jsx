import React from 'react';
import { formatCurrency } from '../../../utils/trackingDataUtils';

const QuotationFinancialSummary = ({ quotation, calculations, t }) => {
    if (!calculations) return null;

    return (
        <section className="flex justify-end mt-4 mb-12" data-purpose="totals-calculation">
            <div className="w-full max-w-[340px] bg-slate-50 dark:bg-[#1e1e20] p-6 rounded-lg border border-slate-100 dark:border-white/5 space-y-3 shadow-inner">
                {calculations.servicePackageTotal > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_sum_service_pkg', 'Gói dịch vụ')}:</span>
                        <span className="font-medium text-slate-700 dark:text-white">{formatCurrency(calculations.servicePackageTotal)}</span>
                    </div>
                )}
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_sum_parts', 'Cộng phụ tùng')}:</span>
                    <span className="font-medium text-slate-700 dark:text-white">{formatCurrency(calculations.partsTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_sum_labor', 'Cộng tiền công')}:</span>
                    <span className="font-medium text-slate-700 dark:text-white">{formatCurrency(calculations.laborTotal)}</span>
                </div>
                <div className="flex justify-between text-sm pb-3 border-b border-slate-200 dark:border-white/10">
                    <span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_sum_vat', 'Thuế VAT')} ({(quotation.vat_rate ?? 0.1) * 100}%):</span>
                    <span className="font-medium text-slate-700 dark:text-white">{formatCurrency(calculations.vatAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase">{t('quote_sum_total', 'Tổng thanh toán')}:</span>
                    <span className="text-lg font-bold text-yellow-500 dark:text-[#d4af37] drop-shadow-sm">{formatCurrency(calculations.grandTotal)}</span>
                </div>
                {calculations.depositAmount > 0 && (
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-white/10">
                        <span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_sum_deposit', 'Cọc trước (50%)')}:</span>
                        <span className="font-semibold text-yellow-600 dark:text-yellow-400">{formatCurrency(calculations.depositAmount)}</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default QuotationFinancialSummary;
