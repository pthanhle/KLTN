import React from 'react';
import { Skeleton } from 'antd';

export const PerformanceSkeleton = () => {
    return (
        <div className="space-y-12">
            {/* KPI Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white dark:bg-[#1c1c1e] rounded-xl p-6 border border-slate-200 dark:border-white/5">
                        <Skeleton.Button active size="small" style={{ width: 120, height: 16, marginBottom: 16 }} />
                        <Skeleton.Button active size="large" style={{ width: 180, height: 40, marginBottom: 16 }} />
                        <Skeleton.Button active size="small" style={{ width: '100%', height: 12 }} />
                    </div>
                ))}
            </div>

            {/* Kanban Skeleton */}
            <div className="mt-16">
                <Skeleton.Button active size="large" style={{ width: 250, height: 32, marginBottom: 32 }} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(col => (
                        <div key={col} className="bg-slate-50/50 dark:bg-[#141416]/50 rounded-xl p-4 border border-slate-200 dark:border-white/5 min-h-[500px]">
                            <Skeleton.Button active size="small" style={{ width: '100%', height: 24, marginBottom: 16 }} />
                            {[1, 2].map(card => (
                                <div key={card} className="bg-white dark:bg-[#1c1c1e] rounded-lg p-4 mb-4 border border-slate-200 dark:border-white/5">
                                    <Skeleton active paragraph={{ rows: 2 }} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
