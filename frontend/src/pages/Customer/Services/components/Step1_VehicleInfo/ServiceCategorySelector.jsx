import React from 'react';
import { Settings, Wrench, Sparkles, CircleDashed } from 'lucide-react';

const ICON_MAP = {
    Settings: <Settings size={28} />,
    Wrench: <Wrench size={28} />,
    Sparkles: <Sparkles size={28} />,
    CircleDashed: <CircleDashed size={28} />
};

const ServiceCategorySelector = ({ categories, selectedCategory, setSelectedCategory, t }) => {
    return (
        <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4 block">
                {t('services:service_category')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {categories.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-6 gap-4 rounded-[20px] transition-all duration-300 border-2 ${selectedCategory === cat.id ? 'bg-white dark:bg-transparent border-yellow-500 text-slate-900 dark:text-white shadow-[0_20px_40px_rgba(234,179,8,0.1)]' : 'bg-white dark:bg-transparent border-transparent dark:border-white/5 text-slate-400 hover:border-slate-200 dark:hover:border-white/10 hover:text-slate-600 dark:hover:text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none'}`}
                    >
                        <div className={`${selectedCategory === cat.id ? 'text-yellow-500' : ''}`}>
                            {ICON_MAP[cat.iconName]}
                        </div>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-center leading-tight">
                            {t(`services:${cat.labelKey}`)}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServiceCategorySelector;
