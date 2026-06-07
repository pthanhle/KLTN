import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const FinancialHUD = ({ quotationData }) => {
    const { t } = useTranslation('adminRODetail');

    const depositPaid = quotationData?.payment_terms?.deposit_amount || 0;
    const remaining = quotationData?.payment_terms?.remaining_amount || 0;
    const grandTotal = quotationData?.summary?.grand_total || 0;
    const hasQuotation = grandTotal > 0;

    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-lg p-4 md:p-5 border border-slate-100 dark:border-white/5 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#23293c] flex items-center justify-center text-slate-600 dark:text-[#d3c5ac] shrink-0 mt-0.5">
                <DollarSign className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest font-semibold">{t('hud_est_total', 'Tổng dự kiến')}</p>
                <p className="text-base font-bold text-amber-500 font-mono truncate leading-none">
                    {hasQuotation ? formatCurrency(grandTotal) : '—'}
                </p>
                {hasQuotation && (
                    <div className="flex flex-col gap-1 mt-1">
                        <div className="flex justify-between items-center gap-2">
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                                {t('hud_deposit_paid', 'Đã đặt cọc')}
                            </span>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                                {formatCurrency(depositPaid)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <span className="text-[10px] text-rose-500 font-semibold uppercase tracking-wider">
                                {t('hud_remaining', 'Còn lại')}
                            </span>
                            <span className="text-xs font-bold text-rose-500 font-mono">
                                {formatCurrency(remaining)}
                            </span>
                        </div>
                    </div>
                )}
                {!hasQuotation && (
                    <div className="bg-slate-100 dark:bg-[#23293c] border border-slate-200 dark:border-white/5 px-2 py-0.5 rounded inline-flex items-center gap-1 mt-1 self-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        <span className="text-[9px] font-bold text-slate-500 dark:text-[#d3c5ac] uppercase tracking-wider">{t('status_no_quotation', 'CHƯA BÁO GIÁ')}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinancialHUD;
