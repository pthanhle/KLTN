export const ChartSkeleton = () => (
    <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full min-h-[380px] flex flex-col animate-pulse">
        <header className="mb-6 flex justify-between items-start">
            <div className="w-1/2">
                <div className="h-6 bg-slate-200 dark:bg-slate-700/50 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-1/2"></div>
            </div>
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700/50 rounded-full"></div>
        </header>
        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-800/30 rounded-xl"></div>
    </section>
);
