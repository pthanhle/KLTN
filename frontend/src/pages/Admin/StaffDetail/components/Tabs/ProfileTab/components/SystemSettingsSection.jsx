import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../../utils/dateUtils';

export const SystemSettingsSection = ({ staff }) => {
    const { t } = useTranslation();

    const getAccessLevelDisplay = (level) => {
        if (level === 'ADMIN') return t('adminStaffDetail:access_level_admin');
        return t('adminStaffDetail:access_level_standard');
    };

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-8 border border-slate-200 dark:border-white/5 flex flex-col justify-between shadow-sm dark:shadow-none transition-colors">
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-yellow-500 tracking-tight mb-8 uppercase">
                    {t('adminStaffDetail:section_system_status')}
                </h2>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{t('adminStaffDetail:label_access_level')}</span>
                        <span className="text-base text-slate-900 dark:text-white font-medium">
                            {getAccessLevelDisplay(staff.accessLevel)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{t('adminStaffDetail:label_last_login')}</span>
                        <span className="text-sm text-slate-900 dark:text-white">
                            {staff.lastLogin ? formatDate(staff.lastLogin) : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
