export const TableSkeleton = () => (
    <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm animate-pulse mt-6">
        <header className="mb-5">
            <div className="h-6 bg-slate-200 dark:bg-slate-700/50 rounded w-48 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-64"></div>
        </header>
        <div className="w-full space-y-4">
            <div className="h-10 bg-slate-100 dark:bg-slate-800/50 rounded-lg"></div>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    <div className="h-6 bg-slate-100 dark:bg-slate-800/30 rounded w-1/5"></div>
                    <div className="h-6 bg-slate-100 dark:bg-slate-800/30 rounded w-1/5"></div>
                    <div className="h-6 bg-slate-100 dark:bg-slate-800/30 rounded w-1/5"></div>
                    <div className="h-6 bg-slate-100 dark:bg-slate-800/30 rounded w-1/5"></div>
                    <div className="h-6 bg-slate-100 dark:bg-slate-800/30 rounded w-1/5"></div>
                </div>
            ))}
        </div>
    </section>
);
