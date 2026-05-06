import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatMillions, calculatePercentage } from '../../utils/performanceUtils';

export const RevenueCard = ({ current, target }) => {
    const { t } = useTranslation();
    const percentage = calculatePercentage(current, target);

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:bg-slate-50 dark:hover:bg-[#2c2c2e] transition-colors">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <p className="font-medium uppercase tracking-widest text-xs text-slate-500 dark:text-gray-400 mb-4">
                {t('adminStaffDetail:perf_kpi_revenue')}
            </p>
            
            <div className="flex items-end gap-3 mb-6">
                <h2 className="text-4xl font-bold bg-gradient-to-br from-yellow-500 to-yellow-600 bg-clip-text text-transparent tracking-tight">
                    {formatMillions(current)}
                </h2>
                <span className="font-medium uppercase tracking-widest text-sm text-slate-400 dark:text-gray-500 pb-1">
                    {t('adminStaffDetail:currency_vnd')}
                </span>
            </div>
            
            <div className="relative w-24 h-24 mx-auto mt-4">
                <div 
                    className="w-full h-full rounded-full transition-all duration-1000" 
                    style={{ background: `conic-gradient(#eab308 0% ${percentage}%, var(--tw-colors-slate-200, #e2e8f0) ${percentage}% 100%)` }}
                >
                    <div className="w-full h-full rounded-full dark:hidden" style={{ background: `conic-gradient(#eab308 0% ${percentage}%, #f1f5f9 ${percentage}% 100%)` }}></div>
                    <div className="w-full h-full rounded-full hidden dark:block" style={{ background: `conic-gradient(#eab308 0% ${percentage}%, #2e3447 ${percentage}% 100%)` }}></div>
                </div>
                <div className="absolute inset-2 bg-white dark:bg-[#1c1c1e] rounded-full flex items-center justify-center group-hover:bg-slate-50 dark:group-hover:bg-[#2c2c2e] transition-colors">
                    <span className="font-bold text-yellow-500 text-sm">{percentage}%</span>
                </div>
            </div>
            
            <div className="flex justify-between mt-6 text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-gray-500 border-t border-slate-100 dark:border-white/10 pt-3">
                <span>{t('adminStaffDetail:perf_kpi_target')}</span>
                <span className="text-slate-600 dark:text-gray-300">{formatMillions(target)} {t('adminStaffDetail:currency_vnd')}</span>
            </div>
        </div>
    );
};
