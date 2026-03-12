const ServiceCard = ({ id, icon: Icon, title, desc }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-10 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-slate-100 dark:border-white/5 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-black/50 hover:border-yellow-200 dark:hover:border-yellow-500/30 transition-all duration-500 group text-center group/card cursor-pointer">
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-white dark:bg-[#141416] shadow-sm rounded-full flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover/card:scale-110 group-hover/card:bg-yellow-500 transition-all duration-500">
                <Icon size={28} className="text-yellow-500 dark:text-yellow-600 group-hover/card:text-white dark:group-hover/card:text-slate-900 transition-colors duration-500" />
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white mb-3 group-hover/card:text-yellow-600 dark:group-hover/card:text-yellow-500 transition-colors">
                {title}
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {desc}
            </p>
            
        </div>
    );
};

export default ServiceCard;
