const SectionWrapper = ({ icon: Icon, title, children, hasDecoration = false }) => {
    return (
        <div className="bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none relative overflow-hidden">
            {hasDecoration && <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-[100px] -z-0"></div>}
            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-yellow-500">
                    {Icon && <Icon size={20} />}
                </div>
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                    {title}
                </h2>
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default SectionWrapper;
