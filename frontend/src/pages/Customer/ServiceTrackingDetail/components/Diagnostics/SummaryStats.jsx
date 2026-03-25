import React from 'react';
import { useTranslation } from 'react-i18next';

const SummaryStats = ({ summary }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#191f31]/90 dark:to-[#0A0A0B]/90 border border-slate-200 dark:border-white/5 p-4 md:p-6 rounded-xl flex flex-col justify-center shadow-sm">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] font-bold uppercase tracking-widest mb-1">{t('stat_total', 'Tổng hạng mục')}</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-[#ffd165]">{summary.total_items}</p>
            </div>
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#191f31]/90 dark:to-[#0A0A0B]/90 border border-slate-200 dark:border-white/5 border-l-4 border-l-emerald-500 dark:border-l-[#4edea3]/40 p-4 md:p-6 rounded-xl flex flex-col justify-center shadow-sm">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] font-bold uppercase tracking-widest mb-1">{t('stat_normal', 'Bình thường')}</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-[#4edea3]">
                    {String(summary.normal).padStart(2, '0')}
                </p>
            </div>
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#191f31]/90 dark:to-[#0A0A0B]/90 border border-slate-200 dark:border-white/5 border-l-4 border-l-yellow-500 dark:border-l-[#ffd165]/40 p-4 md:p-6 rounded-xl flex flex-col justify-center shadow-sm">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] font-bold uppercase tracking-widest mb-1">{t('stat_warning', 'Cần lưu ý')}</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-[#ffd165]">
                    {String(summary.warning).padStart(2, '0')}
                </p>
            </div>
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#191f31]/90 dark:to-[#0A0A0B]/90 border border-slate-200 dark:border-white/5 border-l-4 border-l-red-500 dark:border-l-[#ffb4ab]/40 p-4 md:p-6 rounded-xl flex flex-col justify-center shadow-sm">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] font-bold uppercase tracking-widest mb-1">{t('stat_critical', 'Cần thay thế')}</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-[#ffb4ab]">
                    {String(summary.critical).padStart(2, '0')}
                </p>
            </div>
        </div>
    );
};

export default SummaryStats;
