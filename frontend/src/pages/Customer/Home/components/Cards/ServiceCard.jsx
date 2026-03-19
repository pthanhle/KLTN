const ServiceCard = ({ id, icon: Icon, title, desc, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="flex flex-col items-center justify-center p-8 sm:p-10 bg-white dark:bg-[#141416] rounded-[32px] border border-slate-200/80 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-yellow-400/60 dark:hover:border-yellow-500/40 transition-all duration-500 group text-center cursor-pointer"
        >
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-slate-50 dark:bg-[#0b0f19] shadow-sm rounded-full flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:bg-yellow-500 transition-all duration-500">
                <Icon size={28} className="text-yellow-500 dark:text-yellow-600 group-hover:text-white dark:group-hover:text-slate-900 transition-colors duration-500" />
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                {title}
            </h3>
            
            <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-[1.6] group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                {desc}
            </p>
            
        </div>
    );
};

export default ServiceCard;
