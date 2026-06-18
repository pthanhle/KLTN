import React from 'react';

export const KanbanSummaryCard = ({ todo, inProgress, done, t }) => (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            {t('adminStaffDetail:perf_workload_distribution')}
        </p>
        <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">{t('adminStaffDetail:perf_kanban_todo_generic')}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 rounded-full px-3 py-0.5">{todo}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600 dark:text-yellow-500">{t('adminStaffDetail:perf_kanban_in_progress_generic')}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white bg-yellow-50 dark:bg-yellow-500/10 rounded-full px-3 py-0.5">{inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 dark:text-green-500">{t('adminStaffDetail:perf_kanban_done_generic')}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white bg-green-50 dark:bg-green-500/10 rounded-full px-3 py-0.5">{done}</span>
            </div>
        </div>
    </div>
);
