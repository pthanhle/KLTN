import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../utils/settlementUtils';
import { InvoiceRow } from './components/InvoiceRow';

export const FinancePane = ({ invoiceItems, financials }) => {
    const { t } = useTranslation('adminServiceReception');

    return (
        <section className="bg-slate-50 dark:bg-[#0a0a0b] rounded-xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 border-b border-slate-200 dark:border-white/10 pb-3">
                {t('settlement_invoice_title', 'Chi tiết hóa đơn')}
            </h3>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {/* Table Header */}
                <div className="flex justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pb-2 border-b border-slate-200 dark:border-white/10">
                    <span className="flex-1">{t('settlement_col_item', 'Hạng mục')}</span>
                    <span className="w-16 text-right">{t('settlement_col_qty', 'SL')}</span>
                    <span className="w-28 text-right">{t('settlement_col_price', 'Đơn giá')}</span>
                    <span className="w-32 text-right">{t('settlement_col_total', 'Thành tiền')}</span>
                </div>
                
                {/* Rows */}
                {invoiceItems.length === 0 ? (
                    <div className="py-4 text-center text-sm text-slate-400 italic">{t('settlement_no_items', 'Không có hạng mục nào')}</div>
                ) : (
                    invoiceItems.map(item => (
                        <InvoiceRow key={item.id} item={item} />
                    ))
                )}
            </div>

            {/* Summary Block */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">{t('settlement_subtotal', 'Tổng tiền hàng')}</span>
                    <span className="font-mono">{formatCurrency(financials.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">{t('settlement_vat', 'VAT')} ({financials.vatRate}%)</span>
                    <span className="font-mono">{formatCurrency(financials.vat)}</span>
                </div>
                {financials.deposit > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg -mx-2">
                        <span>{t('settlement_deposit_deduction', 'Khấu trừ đặt cọc')}</span>
                        <span className="font-mono">- {formatCurrency(financials.deposit)}</span>
                    </div>
                )}
                
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#141416] p-4 rounded-xl -mx-2 shadow-inner">
                    <span className="text-sm uppercase tracking-widest text-slate-900 dark:text-white font-black">
                        {t('settlement_final_balance', 'Tổng thanh toán')}
                    </span>
                    <span className="font-mono text-2xl text-slate-900 dark:text-yellow-500 font-black tracking-tight">
                        {formatCurrency(financials.finalBalance)}
                    </span>
                </div>
            </div>
        </section>
    );
};
