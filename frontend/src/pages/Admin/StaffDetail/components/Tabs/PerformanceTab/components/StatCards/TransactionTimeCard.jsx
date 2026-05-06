import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';

export const TransactionTimeCard = ({ time, unit }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-yellow-500/30 transition-colors shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <p className="font-medium uppercase tracking-widest text-xs text-slate-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                    <Zap size={14} className="text-yellow-500" />
                    {t('adminStaffDetail:perf_transaction_time', 'Tốc độ giao dịch')}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
                        {time}
                    </h2>
                    <span className="text-sm font-medium text-slate-500 dark:text-gray-400">{unit}</span>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-yellow-600 dark:text-yellow-500 mt-4">
                    {t('adminStaffDetail:perf_transaction_desc')}
                </p>
            </div>
        </div>
    );
};
