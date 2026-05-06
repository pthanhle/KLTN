import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const ReworkCard = ({ rate, trend }) => {
    const { t } = useTranslation();

    const isGoodTrend = trend <= 0;
    const TrendIcon = isGoodTrend ? TrendingDown : TrendingUp;
    const trendColor = isGoodTrend ? 'text-emerald-400' : 'text-red-400';
    const bgTrendColor = isGoodTrend ? 'bg-emerald-400/10' : 'bg-red-400/10';

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden flex flex-col justify-between group">
            <div className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${isGoodTrend ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

            <div className="relative z-10">
                <p className="font-medium uppercase tracking-widest text-xs text-slate-500 dark:text-gray-400 mb-4">
                    {t('adminStaffDetail:perf_kpi_rework')}
                </p>
                <h2 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight mb-2">
                    {rate}<span className="text-xl text-slate-400 dark:text-gray-500">%</span>
                </h2>
            </div>

            <div className="relative z-10 flex items-center gap-2 mt-auto">
                <div className={`${bgTrendColor} p-2 rounded-full flex items-center justify-center`}>
                    <TrendIcon className={`w-5 h-5 ${trendColor}`} />
                </div>
                <span className={`font-medium uppercase tracking-widest text-xs ${trendColor}`}>
                    {trend > 0 ? '+' : ''}{trend}% {t('adminStaffDetail:perf_kpi_from_last_month')}
                </span>
            </div>
        </div>
    );
};
