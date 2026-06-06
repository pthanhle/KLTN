import React from 'react';

const ROLE_DISPLAY = {
    advisor: { label: 'Cố vấn Dịch vụ', className: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30' },
    service: { label: 'Kỹ thuật viên', className: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30' },
    sale: { label: 'Kinh doanh', className: 'bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30' },
    inventory: { label: 'Kho phụ tùng', className: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-[#070d1f] dark:text-[#dce1fb] dark:border-white/20' },
};

const defaultStyle = { label: null, className: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10' };

export const RoleBadge = ({ role }) => {
    const config = ROLE_DISPLAY[role] || defaultStyle;
    const label = config.label || (role ? role.replace('_', ' ').toUpperCase() : 'N/A');

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] whitespace-nowrap border ${config.className}`}>
            {label}
        </span>
    );
};
