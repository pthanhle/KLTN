import React from 'react';
import { useTranslation } from 'react-i18next';

export const EfficiencyCard = ({ billed, clocked, rate }) => {
    const { t } = useTranslation();
    
    // Calculate progress bar width for billed vs clocked
    const clockedPercent = 85; // Mock base
    const billedPercent = Math.min(rate, 100);

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-6 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-[#2c2c2e] transition-colors flex flex-col justify-between">
            <div>
                <p className="font-medium uppercase tracking-widest text-xs text-slate-500 dark:text-gray-400 mb-4">
                    {t('adminStaffDetail:perf_kpi_efficiency')}
                </p>
                <h2 className="text-4xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight mb-6">
                    {rate}%
                </h2>
            </div>
            
            <div className="space-y-4 w-full mt-auto">
                <div>
                    <div className="flex justify-between font-medium uppercase text-[10px] tracking-widest mb-1 text-slate-500 dark:text-gray-400">
                        <span>{t('adminStaffDetail:perf_kpi_billed')} ({billed}h)</span>
                        <span className="text-yellow-600 dark:text-yellow-500">{rate}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full transition-all duration-1000" style={{ width: `${billedPercent}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between font-medium uppercase text-[10px] tracking-widest mb-1 text-slate-500 dark:text-gray-400">
                        <span>{t('adminStaffDetail:perf_kpi_clocked')} ({clocked}h)</span>
                        <span>{t('adminStaffDetail:perf_base')}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-300 dark:bg-gray-500/50 rounded-full transition-all duration-1000" style={{ width: `${clockedPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
