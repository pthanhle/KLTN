import React from 'react';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const KpiCommissionSection = ({ formData, handleInputChange }) => {
    const { t } = useTranslation();

    const getSuffix = () => {
        if (formData.kpiType === 'COMMISSION') return t('adminStaffDetail:suffix_percent');
        if (formData.kpiType === 'FLAT_RATE') return t('adminStaffDetail:suffix_vnd_hr');
        return '';
    };

    const getDescription = () => {
        if (formData.kpiType === 'COMMISSION') return t('adminStaffDetail:desc_kpi_commission');
        if (formData.kpiType === 'FLAT_RATE') return t('adminStaffDetail:desc_kpi_flat_rate');
        return t('adminStaffDetail:desc_kpi_salary_only');
    };

    const getLabel = () => {
        if (formData.kpiType === 'COMMISSION') return t('adminStaffDetail:label_kpi_value_commission');
        if (formData.kpiType === 'FLAT_RATE') return t('adminStaffDetail:label_kpi_value_flat_rate');
        return t('adminStaffDetail:label_kpi_value');
    };

    return (
        <section className="bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/5 rounded-xl p-8">
            <div className="flex items-center mb-6 border-b border-slate-200 dark:border-white/5 pb-4">
                <TrendingUp className="w-5 h-5 text-yellow-500 mr-3" />
                <h3 className="font-medium text-sm text-slate-800 dark:text-gray-200 tracking-wide uppercase">{t('adminStaffDetail:section_kpi_comm')}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                    <label className="block text-slate-500 dark:text-gray-400 text-sm font-medium mb-2" htmlFor="kpiType">
                        {t('adminStaffDetail:label_kpi_type')}
                    </label>
                    <div className="relative">
                        <select 
                            id="kpiType" 
                            name="kpiType" 
                            value={formData.kpiType}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-slate-800 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-colors appearance-none"
                        >
                            <option value="SALARY_ONLY">{t('adminStaffDetail:kpi_type_salary_only')}</option>
                            <option value="COMMISSION">{t('adminStaffDetail:kpi_type_commission')}</option>
                            <option value="FLAT_RATE">{t('adminStaffDetail:kpi_type_flat_rate')}</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-gray-500" />
                        </div>
                    </div>
                </div>
                
                <div>
                    <label className="block text-slate-500 dark:text-gray-400 text-sm font-medium mb-2" htmlFor="kpiValue">
                        {getLabel()}
                    </label>
                    <div className="relative">
                        <input 
                            type="text"
                            inputMode="decimal"
                            id="kpiValue" 
                            name="kpiValue" 
                            placeholder="0" 
                            value={formData.kpiValue}
                            onChange={handleInputChange}
                            disabled={formData.kpiType === 'SALARY_ONLY'}
                            className={`w-full bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-4 pr-24 text-slate-800 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-colors ${formData.kpiType === 'SALARY_ONLY' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span className="text-slate-500 dark:text-gray-500 text-sm">{getSuffix()}</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-gray-500 text-xs mt-2">{getDescription()}</p>
                </div>
            </div>
        </section>
    );
};
