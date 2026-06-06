import React from 'react';
import { usePerformanceData } from './hooks/usePerformanceData';
import { PerformanceSkeleton } from './components/Shared/PerformanceSkeleton';
import { WorkloadKanban } from './components/WorkloadKanban';

const getRoleLabel = (role) => {
    const map = {
        advisor: 'Cố vấn Dịch vụ',
        service: 'Kỹ thuật viên',
        sale: 'Kinh doanh',
        inventory: 'Kho phụ tùng',
    };
    return map[role] || role || 'Nhân viên';
};

const CompletionRateCard = ({ completionRate, total, completed }) => (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Tỉ lệ hoàn thành
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
            {completed}/{total} lệnh sửa chữa hoàn thành
        </p>
    </div>
);

const KanbanSummaryCard = ({ todo, inProgress, done }) => (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Phân bổ công việc
        </p>
        <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">Chờ xử lý</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 rounded-full px-3 py-0.5">{todo}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-600 dark:text-yellow-500">Đang xử lý</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white bg-yellow-50 dark:bg-yellow-500/10 rounded-full px-3 py-0.5">{inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 dark:text-green-500">Hoàn thành</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white bg-green-50 dark:bg-green-500/10 rounded-full px-3 py-0.5">{done}</span>
            </div>
        </div>
    </div>
);

const PerformanceTab = ({ staff }) => {
    const { performanceData, isLoading } = usePerformanceData(staff);

    if (isLoading) {
        return <PerformanceSkeleton />;
    }

    if (!performanceData) {
        return (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-16 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none h-64">
                <p className="text-slate-500 dark:text-slate-400">
                    Chưa có dữ liệu hiệu suất cho <strong>{getRoleLabel(staff?.role)}</strong>
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
                />
                <KanbanSummaryCard
                    todo={todo.length}
                    inProgress={inProgress.length}
                    done={done.length}
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
