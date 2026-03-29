import { MapPin, PhoneCall, Clock } from 'lucide-react';

const iconsMap = {
    address: MapPin,
    hotline: PhoneCall,
    workingHours: Clock
};

const InfoCardItem = ({ itemKey, data, isLoading, t }) => {
    const Icon = iconsMap[itemKey] || MapPin;

    if (isLoading) {
        return (
            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl p-10 rounded-[32px] border border-slate-200/50 dark:border-white/5 animate-pulse">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700/50 rounded-full mb-8"></div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700/50 rounded-md mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700/50 rounded-sm"></div>
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700/50 rounded-sm"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl p-10 rounded-[32px] group hover:-translate-y-2 transition-all duration-500 border border-slate-200/50 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-yellow-500 transition-colors duration-500">
                <Icon className="text-yellow-600 dark:text-yellow-500 group-hover:text-slate-900 transition-colors duration-500 w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold mb-5 tracking-tight text-slate-900 dark:text-white uppercase">
                {t(data.titleKey)}
            </h3>
            {data.items ? (
                <div className="space-y-4">
                    {data.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                            <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">{t(item.labelKey)}</span>
                            <span className="text-slate-700 dark:text-slate-300 font-semibold text-base">{item.value}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed whitespace-pre-line text-[15px]">
                    {data.content}
                </p>
            )}
        </div>
    );
};

export default InfoCardItem;
