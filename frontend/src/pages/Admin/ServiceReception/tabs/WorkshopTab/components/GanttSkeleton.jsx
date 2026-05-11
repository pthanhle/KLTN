import React from 'react';
import { Skeleton } from 'antd';

const GanttSkeleton = () => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0a0b] h-full p-4 md:p-6 animate-in fade-in duration-300">
            {/* Filter Toolbar Skeleton */}
            <div className="bg-white dark:bg-[#141416] rounded-xl p-6 mb-6 flex flex-wrap gap-6 justify-between items-center shadow-sm border border-slate-200 dark:border-white/5">
                <div>
                    <Skeleton.Button active size="small" shape="round" style={{ width: 250, marginBottom: 8 }} />
                    <Skeleton.Button active size="small" shape="round" style={{ width: 150 }} />
                </div>
                <div className="flex gap-4">
                    <Skeleton.Button active size="large" shape="round" style={{ width: 220 }} />
                    <Skeleton.Button active size="large" shape="round" style={{ width: 130 }} />
                </div>
            </div>

            {/* Gantt Grid Skeleton */}
            <div className="flex-1 overflow-hidden relative rounded-xl bg-white dark:bg-[#0a0a0b] border border-slate-200 dark:border-white/10 flex flex-col">
                {/* Header Skeleton */}
                <div className="flex bg-slate-100 dark:bg-[#141416] border-b border-slate-200 dark:border-white/10 h-12 sticky top-0">
                    <div className="w-80 shrink-0 border-r border-slate-200 dark:border-white/10"></div>
                    <div className="flex-1 flex px-4 items-center gap-8 justify-around">
                        {[...Array(9)].map((_, i) => (
                            <Skeleton.Button key={i} active size="small" style={{ width: 40 }} />
                        ))}
                    </div>
                </div>

                {/* Rows Skeleton */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex min-h-[140px] border-b border-slate-200 dark:border-white/10">
                            {/* Y-Axis Column */}
                            <div className="w-80 shrink-0 bg-slate-50 dark:bg-[#141416] p-5 flex flex-col justify-center border-r border-slate-200 dark:border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                    <Skeleton.Button active size="small" style={{ width: 80 }} />
                                    <Skeleton.Button active size="small" style={{ width: 60 }} />
                                </div>
                                <div className="flex items-center gap-3.5 bg-white dark:bg-[#0a0a0b] rounded-xl p-3 border border-slate-200 dark:border-white/10">
                                    <Skeleton.Avatar active size="large" shape="circle" />
                                    <div className="flex-1">
                                        <Skeleton.Button active size="small" style={{ width: '80%', marginBottom: 4 }} />
                                        <Skeleton.Button active size="small" style={{ width: '50%' }} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* X-Axis Grid Area with fake RO Blocks */}
                            <div className="flex-1 flex relative p-4 items-center">
                                {/* Dashed lines */}
                                <div className="absolute inset-0 flex">
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className="flex-1 border-l border-dashed border-slate-200 dark:border-white/10 opacity-30"></div>
                                    ))}
                                </div>
                                
                                {/* Fake Block 1 */}
                                {index === 0 && (
                                    <div className="absolute left-[10%] w-[25%] h-20 bg-slate-200 dark:bg-[#2a3043] rounded-xl border border-slate-300 dark:border-white/5 p-3 flex flex-col justify-between overflow-hidden">
                                        <Skeleton.Button active size="small" style={{ width: '50%' }} />
                                        <Skeleton.Button active size="small" style={{ width: '90%' }} />
                                    </div>
                                )}
                                
                                {/* Fake Block 2 */}
                                {index === 1 && (
                                    <div className="absolute left-[40%] w-[35%] h-20 bg-slate-200 dark:bg-[#2a3043] rounded-xl border border-slate-300 dark:border-white/5 p-3 flex flex-col justify-between overflow-hidden">
                                        <Skeleton.Button active size="small" style={{ width: '40%' }} />
                                        <Skeleton.Button active size="small" style={{ width: '80%' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GanttSkeleton;
