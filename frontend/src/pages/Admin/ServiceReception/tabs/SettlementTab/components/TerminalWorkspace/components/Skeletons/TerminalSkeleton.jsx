import React from 'react';

export const TerminalSkeleton = () => {
    return (
        <section className="flex-1 bg-white dark:bg-[#151b2d] rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20 animate-pulse">
            <header className="p-6 bg-slate-50 dark:bg-[#23293c] border-b border-slate-200 dark:border-white/10 flex justify-between items-center shrink-0">
                <div className="space-y-3">
                    <div className="h-6 w-48 bg-slate-200 dark:bg-white/10 rounded-md"></div>
                    <div className="h-4 w-32 bg-slate-200 dark:bg-white/5 rounded-md"></div>
                </div>
                <div className="flex gap-4">
                    <div className="h-12 w-32 bg-slate-200 dark:bg-white/10 rounded-xl"></div>
                    <div className="h-12 w-48 bg-slate-200 dark:bg-white/10 rounded-xl"></div>
                </div>
            </header>

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="h-64 bg-slate-100 dark:bg-[#191f31] rounded-xl border border-slate-200 dark:border-white/5"></div>
                    <div className="h-48 bg-slate-100 dark:bg-[#191f31] rounded-xl border border-slate-200 dark:border-white/5"></div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="h-80 bg-slate-100 dark:bg-[#191f31] rounded-xl border border-slate-200 dark:border-white/5"></div>
                    <div className="h-32 bg-slate-100 dark:bg-[#191f31] rounded-xl border border-slate-200 dark:border-white/5"></div>
                </div>
            </div>
        </section>
    );
};
