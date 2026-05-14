import React from 'react';

export const QueueBoardSkeleton = () => {
    return (
        <section className="bg-white dark:bg-[#151b2d] rounded-2xl flex flex-col border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/20 h-full w-full max-w-7xl mx-auto animate-pulse">
            {/* Header Skeleton */}
            <header className="p-6 md:p-8 bg-slate-50 dark:bg-[#23293c] border-b border-slate-200 dark:border-white/10 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 w-full md:w-1/2">
                    <div className="h-8 w-64 bg-slate-200 dark:bg-white/10 rounded-lg"></div>
                    <div className="h-4 w-96 max-w-full bg-slate-200 dark:bg-white/5 rounded-md"></div>
                </div>
                <div className="w-full md:w-96">
                    <div className="h-12 w-full bg-slate-200 dark:bg-white/10 rounded-xl"></div>
                </div>
            </header>

            {/* Grid Skeleton */}
            <div className="flex-1 p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-32 bg-slate-100 dark:bg-[#191f31] rounded-xl border border-slate-200 dark:border-white/5"></div>
                    ))}
                </div>
            </div>
        </section>
    );
};
