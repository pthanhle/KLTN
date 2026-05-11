import React from 'react';

const InboxSkeleton = () => {
    return (
        <div className="w-full flex-1 flex flex-col bg-white dark:bg-[#0a0a0b] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex flex-col gap-2">
                    <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            </div>

            <div className="hidden md:flex px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                <div className="w-[10%]"><div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12"></div></div>
                <div className="w-[25%] pr-4"><div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div></div>
                <div className="w-[25%] pr-4"><div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div></div>
                <div className="w-[30%] pr-4"><div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-32"></div></div>
                <div className="w-[10%] flex justify-end"><div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div></div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex px-6 py-5 border-b border-slate-100 dark:border-white/5">
                        <div className="w-[10%] flex flex-col gap-2">
                            <div className="h-5 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="w-[20%] flex flex-col gap-2 ml-4">
                            <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="w-[20%] flex flex-col gap-2 ml-4">
                            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="w-full md:w-[30%] flex flex-col gap-2 pr-4 mb-3 md:mb-0">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                            <div className="flex gap-1.5 mt-1">
                                <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded w-16"></div>
                                <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded w-20"></div>
                            </div>
                        </div>
                        <div className="w-[10%] flex justify-end ml-4 items-start">
                            <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InboxSkeleton;
