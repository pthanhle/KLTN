import React from 'react';
import { Skeleton } from 'antd';

export const DashboardSkeleton = () => {
    return (
        <div className="w-full space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
                <div>
                    <Skeleton.Input active size="small" className="w-24 mb-2 block" />
                    <Skeleton.Input active size="large" className="w-48 mb-2 block" />
                    <Skeleton.Input active size="small" className="w-32 block" />
                </div>
                <div className="flex gap-4 mt-6 md:mt-0">
                    <Skeleton.Button active shape="round" className="w-40 h-12" />
                    <Skeleton.Button active shape="round" className="w-32 h-12" />
                </div>
            </div>

            {/* Greeting Banner */}
            <div className="bg-white dark:bg-[#141416] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 dark:border-white/5 h-48">
                <Skeleton active paragraph={{ rows: 2 }} />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-32">
                        <Skeleton active paragraph={{ rows: 1 }} />
                    </div>
                ))}
            </div>

            {/* Recent Orders & Order Status Donut */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-80">
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
                <div className="xl:col-span-1 bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-80">
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
            </div>

            {/* Operational Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-96">
                    <Skeleton active paragraph={{ rows: 8 }} />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-48">
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </div>
                    <div className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-48">
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </div>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4 content-start">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white dark:bg-[#141416] p-4 rounded-2xl border border-slate-200/60 dark:border-white/5 h-24">
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </div>
                        ))}
                    </div>
                    <div className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 h-48">
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
