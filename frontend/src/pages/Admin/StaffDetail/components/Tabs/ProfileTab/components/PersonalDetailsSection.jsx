import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, calculateTenure } from '../../../../utils/dateUtils';

export const PersonalDetailsSection = ({ staff }) => {
    const { t } = useTranslation();

    return (
        <div className="lg:col-span-2 bg-white dark:bg-[#1c1c1e] rounded-2xl p-8 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
            <h2 className="text-xl font-bold text-slate-800 dark:text-yellow-500 tracking-tight mb-8 uppercase">
                {t('adminStaffDetail:section_personal')}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                <div className="flex flex-col gap-2">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{t('adminStaffDetail:label_fullname')}</span>
                    <span className="text-base text-slate-900 dark:text-white font-medium">{staff.fullName}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{t('adminStaffDetail:label_department')}</span>
                    <span className="text-base text-slate-900 dark:text-white font-medium">{staff.department}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{t('adminStaffDetail:label_join_date')}</span>
                    <span className="text-base text-slate-900 dark:text-white font-medium">{formatDate(staff.joinDate)}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{t('adminStaffDetail:label_tenure')}</span>
                    <span className="text-base text-yellow-600 dark:text-yellow-500 font-bold">{calculateTenure(staff.joinDate)}</span>
                </div>
            </div>
        </div>
    );
};
