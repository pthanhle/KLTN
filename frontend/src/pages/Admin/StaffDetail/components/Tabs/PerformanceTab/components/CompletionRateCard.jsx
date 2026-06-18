import React from 'react';

export const CompletionRateCard = ({ completionRate, total, completed, role, t }) => (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            {t('adminStaffDetail:perf_completion_rate')}
        </p>
        <div className="flex items-end gap-3 mb-4">
            <span className={`text-5xl font-black ${completionRate >= 80 ? 'text-green-500' : completionRate >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                {completionRate}%
            </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2 mb-4 overflow-hidden">
            <div
                className={`h-2 rounded-full transition-all ${completionRate >= 80 ? 'bg-green-500' : completionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${completionRate}%` }}
            />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
            {completed}/{total} {role === 'sale' ? t('adminStaffDetail:perf_completed_contracts') : t('adminStaffDetail:perf_completed_repairs')}
        </p>
    </div>
);
