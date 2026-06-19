export const CardSkeleton = () => (
    <article className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-700/50 rounded w-3/4"></div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700/50 flex-shrink-0"></div>
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700/50 rounded w-2/3 mt-6"></div>
    </article>
);
