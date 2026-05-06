import React from 'react';
import { Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BaseCompensationSection = ({ formData, handleInputChange }) => {
    const { t } = useTranslation();

    return (
        <section className="bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/5 rounded-xl p-8">
            <div className="flex items-center mb-6 border-b border-slate-200 dark:border-white/5 pb-4">
                <Wallet className="w-5 h-5 text-yellow-500 mr-3" />
                <h3 className="font-medium text-sm text-slate-800 dark:text-gray-200 tracking-wide uppercase">{t('adminStaffDetail:section_base_comp')}</h3>
            </div>
            <div className="max-w-md">
                <label className="block text-slate-500 dark:text-gray-400 text-sm font-medium mb-2" htmlFor="baseSalary">
                    {t('adminStaffDetail:label_base_salary')}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-500 dark:text-gray-500 text-sm">{t('adminStaffDetail:currency_vnd')}</span>
                    </div>
                    <input 
                        type="text"
                        inputMode="decimal"
                        id="baseSalary" 
                        name="baseSalary" 
                        placeholder="0" 
                        value={formData.baseSalary}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-14 pr-4 text-slate-800 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-colors" 
                    />
                </div>
            </div>
        </section>
    );
};
