import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

export const ErrorRateCard = ({ rate }) => {
    const { t } = useTranslation();
    
    const isWarning = rate > 1.0;

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-colors shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 dark:bg-red-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <p className="font-medium uppercase tracking-widest text-xs text-slate-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                    <AlertTriangle size={14} className={isWarning ? 'text-red-500' : 'text-slate-400'} />
                    {t('adminStaffDetail:perf_document_errors', 'Sai sót chứng từ')}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                    <h2 className={`text-4xl font-bold tracking-tight ${isWarning ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>
                        {rate}%
                    </h2>
                </div>
                <p className={`text-[10px] font-medium uppercase tracking-widest mt-4 ${isWarning ? 'text-red-500' : 'text-emerald-500'}`}>
                    {isWarning ? t('adminStaffDetail:perf_needs_improvement') : t('adminStaffDetail:perf_very_good')}
                </p>
            </div>
        </div>
    );
};
