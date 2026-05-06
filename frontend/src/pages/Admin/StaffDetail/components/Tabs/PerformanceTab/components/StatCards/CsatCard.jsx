import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, StarHalf, TrendingUp } from 'lucide-react';

export const CsatCard = ({ score, percentile }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-6 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-[#2c2c2e] transition-colors flex flex-col justify-between">
            <div>
                <p className="font-medium uppercase tracking-widest text-xs text-slate-500 dark:text-gray-400 mb-4">
                    {t('adminStaffDetail:perf_kpi_csat')}
                </p>
                <h2 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight mb-2">
                    {score}<span className="text-xl text-slate-400 dark:text-gray-500">/5.0</span>
                </h2>
            </div>
            
            <div className="flex gap-1 mt-auto text-yellow-500">
                {/* Simplified star rendering based on score 4.5 vs 4.8 */}
                <Star className="w-8 h-8 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <Star className="w-8 h-8 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <Star className="w-8 h-8 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <Star className="w-8 h-8 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                {score % 1 !== 0 ? (
                    <StarHalf className="w-8 h-8 fill-current text-yellow-500" />
                ) : (
                    <Star className="w-8 h-8 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/10">
                <p className="font-medium uppercase text-[10px] tracking-widest text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> {percentile}
                </p>
            </div>
        </div>
    );
};
