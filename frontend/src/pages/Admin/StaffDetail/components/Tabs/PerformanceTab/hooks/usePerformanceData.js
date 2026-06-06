export const usePerformanceData = (staff) => {
    if (!staff?.performance) {
        return { performanceData: null, isLoading: false };
    }

    const { performance } = staff;
    const kanban = performance.kanban || { todo: [], inProgress: [], done: [] };

    const performanceData = {
        kpis: {
            completionRate: performance.completionRate ?? 0,
            totalRepairs: performance.totalRepairs ?? 0,
            completedRepairs: performance.completedRepairs ?? 0,
        },
        kanban,
    };

    return { performanceData, isLoading: false };
};
