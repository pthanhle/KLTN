import React from 'react';
import { useTranslation } from 'react-i18next';

export const StatusIndicator = ({ status }) => {
    const { t } = useTranslation(['adminStaff']);

    const getStatusStyle = () => {
        switch (status) {
            case 'ACTIVE':
                return {
                    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
                    text: 'text-emerald-600 dark:text-emerald-400',
                    dot: 'bg-emerald-500',
                    label: t('adminStaff:status_active', 'Đang Làm Việc')
                };
            case 'ON_LEAVE':
                return {
                    bg: 'bg-amber-50 dark:bg-amber-500/10',
                    text: 'text-amber-600 dark:text-amber-400',
                    dot: 'bg-amber-500',
                    label: t('adminStaff:status_on_leave', 'Nghỉ Phép')
                };
            case 'SUSPENDED':
                return {
                    bg: 'bg-rose-50 dark:bg-rose-500/10',
                    text: 'text-rose-600 dark:text-rose-400',
                    dot: 'bg-rose-500',
                    label: t('adminStaff:status_suspended', 'Đình Chỉ')
                };
            default:
                return {
                    bg: 'bg-slate-50 dark:bg-slate-500/10',
                    text: 'text-slate-600 dark:text-slate-400',
                    dot: 'bg-slate-500',
                    label: status
                };
        }
    };

    const style = getStatusStyle();

    return (
        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${style.bg} border border-black/5 dark:border-white/5 whitespace-nowrap min-w-max`}>
            <div className={`w-1.5 h-1.5 rounded-full ${style.dot} shrink-0`}></div>
            <span className={`text-[11px] font-bold tracking-wider uppercase ${style.text}`}>
                {style.label}
            </span>
        </div>
    );
};
