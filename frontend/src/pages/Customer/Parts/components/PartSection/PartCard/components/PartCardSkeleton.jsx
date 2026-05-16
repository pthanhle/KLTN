const PartCardSkeleton = () => (
    <div className="bg-white dark:bg-[#141416] rounded-[24px] p-4 flex flex-col h-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-50 dark:border-white/5">
        <div className="w-full h-[180px] bg-slate-100 dark:bg-white/10 rounded-xl mb-5 animate-pulse"></div>
        <div className="h-5 bg-slate-100 dark:bg-white/10 rounded w-[80%] mb-3 animate-pulse"></div>
        <div className="h-3 bg-slate-100 dark:bg-white/10 rounded w-[60%] mb-4 animate-pulse"></div>
        <div className="h-3 bg-slate-100 dark:bg-white/10 rounded w-full mb-1 animate-pulse"></div>
        <div className="h-3 bg-slate-100 dark:bg-white/10 rounded w-[90%] mb-6 animate-pulse"></div>
        <div className="mt-auto flex justify-between items-end pt-4 border-t border-slate-100/50 dark:border-white/10">
            <div className="h-6 bg-slate-100 dark:bg-white/10 rounded w-28 animate-pulse"></div>
            <div className="h-[42px] w-[42px] bg-slate-100 dark:bg-white/10 rounded-xl animate-pulse"></div>
        </div>
    </div>
);

export default PartCardSkeleton;
