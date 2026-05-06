import React from 'react';
import { Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AdditionalPerksSection = ({ formData, handleToggleOvertime }) => {
    const { t } = useTranslation();

    return (
        <section className="bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/5 rounded-xl p-8">
            <div className="flex items-center mb-6 border-b border-slate-200 dark:border-white/5 pb-4">
                <Gift className="w-5 h-5 text-yellow-500 mr-3" />
                <h3 className="font-medium text-sm text-slate-800 dark:text-gray-200 tracking-wide uppercase">{t('adminStaffDetail:section_perks')}</h3>
            </div>
            
            <div className="flex items-center justify-between bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/5 p-5 rounded-lg">
                <div>
                    <h4 className="text-slate-800 dark:text-white font-medium text-sm mb-1">{t('adminStaffDetail:label_overtime')}</h4>
                    <p className="text-slate-500 dark:text-gray-500 text-sm">{t('adminStaffDetail:desc_overtime')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="isOvertimeEligible" 
                        checked={formData.isOvertimeEligible}
                        onChange={handleToggleOvertime}
                        className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
            </div>
        </section>
    );
};
