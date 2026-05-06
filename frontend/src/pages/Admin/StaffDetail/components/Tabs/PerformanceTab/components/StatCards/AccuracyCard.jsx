import React from 'react';
import { useTranslation } from 'react-i18next';

export const AccuracyCard = ({ accuracy, target }) => {
    const { t } = useTranslation();

    const isGood = accuracy >= target;

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <p className="font-medium uppercase tracking-widest text-xs text-slate-500 dark:text-gray-400 mb-4">
                    {t('adminStaffDetail:perf_inventory_accuracy', 'Độ chính xác tồn kho')}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
                        {accuracy}%
                    </h2>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between font-medium uppercase text-[10px] tracking-widest mb-1 text-slate-500 dark:text-gray-400">
                        <span>{t('adminStaffDetail:perf_target')}: {target}%</span>
                        <span className={isGood ? 'text-emerald-500' : 'text-red-500'}>
                            {isGood ? t('adminStaffDetail:perf_achieved') : t('adminStaffDetail:perf_not_achieved')}
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div
                            className={`h-1.5 rounded-full ${isGood ? 'bg-blue-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(100, accuracy)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
