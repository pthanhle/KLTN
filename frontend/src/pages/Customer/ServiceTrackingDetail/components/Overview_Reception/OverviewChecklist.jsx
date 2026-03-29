import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

const OverviewChecklist = ({ checklist }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-white/80 dark:bg-[#191f31]/70 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-yellow-500/10">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-600 dark:text-[#ffd165] mb-6 md:mb-8">
                {t('title_equipment_checklist', 'Equipment Checklist')}
            </h3>
            
            <div className="grid grid-cols-1 gap-3 md:gap-4">
                {checklist.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#23293c] rounded-2xl border border-slate-200 dark:border-white/5 hover:border-yellow-500/30 dark:hover:border-yellow-500/20 transition-all shadow-sm"
                    >
                        <span className="text-sm font-semibold text-slate-800 dark:text-[#dce1fb]">{item.name}</span>
                        {item.checked && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-[#4edea3]" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverviewChecklist;
