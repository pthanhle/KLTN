import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROLE_STYLES } from '../../constants/staffConstants';

export const RoleBadge = ({ role }) => {
    const { t } = useTranslation(['adminStaff']);

    const defaultStyle = {
        className: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-surface-container dark:text-slate-300 dark:border-white/10'
    };

    const style = ROLE_STYLES[role] || defaultStyle;
    
    // Convert role to translation key format: 'SHOP_FOREMAN' -> 'role_shop_foreman'
    const translationKey = `role_${role?.toLowerCase()}`;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] whitespace-nowrap border ${style.className}`}>
            {t(`adminStaff:${translationKey}`, role?.replace('_', ' '))}
        </span>
    );
};
