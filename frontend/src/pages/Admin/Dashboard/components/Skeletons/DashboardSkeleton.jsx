import React from 'react';
import { Skeleton } from 'antd';

export const DashboardSkeleton = () => {
    return (
        <div className="w-full pb-24 pt-4 md:pt-6 animate-in fade-in duration-500">
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton.Input active size="large" className="w-48 mb-2" />
                        <Skeleton.Input active size="small" className="w-32" />
                    </div>
                    <Skeleton.Button active shape="round" className="w-24" />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 h-40">
                    <Skeleton active paragraph={{ rows: 2 }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 h-32">
                            <Skeleton active paragraph={{ rows: 1 }} />
                        </div>
                    ))}
                </div>

                {/* Section 3: Revenue Area Chart + Order Status Donut */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-80">
                        <Skeleton active paragraph={{ rows: 6 }} />
                    </div>
                    <div className="xl:col-span-1 bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-80">
                        <Skeleton active paragraph={{ rows: 6 }} />
                    </div>
                </div>

            </div>
        </div>
    );
};
