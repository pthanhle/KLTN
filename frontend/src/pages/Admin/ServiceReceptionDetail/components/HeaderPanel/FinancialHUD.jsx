import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const FinancialHUD = ({ quotationData }) => {
    const { t } = useTranslation('adminRODetail');
    
    const paymentStatus = quotationData?.payment_terms?.deposit_status || 'PENDING';
    const estTotal = quotationData?.summary?.grand_total || 0;

    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-lg p-4 md:p-5 border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#23293c] flex items-center justify-center text-slate-600 dark:text-[#d3c5ac] shrink-0">
                <DollarSign className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col items-start">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest mb-0.5">{t('hud_est_total', 'Tổng dự kiến')}</p>
                <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-bold text-amber-500 font-mono truncate">
                        {formatCurrency(estTotal)}
                    </p>
                    {paymentStatus === 'PAID' ? (
                        <div className="bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t('status_paid', 'ĐÃ THANH TOÁN')}</span>
                        </div>
                    ) : (
                        <div className="bg-rose-100 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                            <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">{t('status_unpaid', 'CHƯA THANH TOÁN')}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinancialHUD;
