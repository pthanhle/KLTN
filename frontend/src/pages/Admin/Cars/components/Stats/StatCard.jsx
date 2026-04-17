const StatCard = ({
    title,
    value,
    unit,
    icon: Icon,
    valueColorClass,
    iconGradientClass,
    shadowHoverClass,
    borderHoverClass,
    footerContent
}) => {
    return (
        <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 ${shadowHoverClass} ${borderHoverClass || ''}`}>
            <div className="flex items-start justify-between">
                <div className="space-y-1 overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">{title}</p>
                    <div className="flex items-center gap-1.5 flex-wrap min-h-[40px]">
                        <h2 className={`text-2xl md:text-3xl font-black tracking-tighter truncate leading-none ${valueColorClass}`}>{value}</h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 opacity-70 mt-1">{unit}</span>
                    </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradientClass} text-white shadow-lg dark:shadow-none`}>
                    <Icon size={24} strokeWidth={2.5} />
                </div>
            </div>

            <div className={`mt-6 ${!footerContent ? 'opacity-0' : ''}`}>
                {footerContent && footerContent}
            </div>
        </div>
    );
};

export default StatCard;
