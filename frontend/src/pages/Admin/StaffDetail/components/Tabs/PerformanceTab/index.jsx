import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePerformanceData } from './hooks/usePerformanceData';
import { PerformanceSkeleton } from './components/Shared/PerformanceSkeleton';
import { WorkloadKanban } from './components/WorkloadKanban';
import { CompletionRateCard } from './components/CompletionRateCard';
import { KanbanSummaryCard } from './components/KanbanSummaryCard';



const PerformanceTab = ({ staff }) => {
    const { t } = useTranslation('adminStaffDetail');
    const { performanceData, isLoading } = usePerformanceData(staff);

    if (isLoading) {
        return <PerformanceSkeleton />;
    }

    if (!performanceData) {
        return (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-16 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none h-64">
                <p className="text-slate-500 dark:text-slate-400">
                    {t('adminStaffDetail:perf_fallback_unavailable', { role: staff?.role || '' })}
                </p>
            </div>
        );
    }

    const { kpis, kanban } = performanceData;
    const { todo = [], inProgress = [], done = [] } = kanban;
    const totalRepairs = kpis.totalRepairs ?? (todo.length + inProgress.length + done.length);
    const completedRepairs = kpis.completedRepairs ?? done.length;
    const completionRate = kpis.completionRate ?? (totalRepairs > 0 ? Math.round((completedRepairs / totalRepairs) * 100) : 0);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CompletionRateCard
                    completionRate={completionRate}
                    total={totalRepairs}
                    completed={completedRepairs}
                    role={staff?.role}
                    t={t}
                />
                <KanbanSummaryCard
                    todo={todo.length}
                    inProgress={inProgress.length}
                    done={done.length}
                    t={t}
                />
            </div>

            <WorkloadKanban
                kanbanData={kanban}
                role={staff?.role}
                staffName={staff?.fullName}
            />
        </div>
    );
};

export default PerformanceTab;
