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
                <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
                    <h2 className={`text-3xl font-extrabold tracking-tight ${valueColorClass}`}>{value} {unit}</h2>
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
