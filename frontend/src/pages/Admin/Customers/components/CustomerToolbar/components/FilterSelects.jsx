import React from 'react';
import { Select } from 'antd';

export const FilterSelects = ({ t, filterConfig, filterOptions, onFilterChange }) => {
    
    // Nối Option "Tất cả" (Default / None Filter) vào mảng Data từ DB
    const statusOptions = [
        { value: 'all', label: <span className="font-bold text-slate-800 dark:text-slate-300">{t('adminCustomers:statusAll', 'Tất cả trạng thái')}</span> },
        ...filterOptions.statuses.map(opt => ({
            value: opt.id,
            label: <span className="font-bold text-slate-800 dark:text-slate-300">{t(opt.name, opt.fallback)}</span>
        }))
    ];

    const tierOptions = [
        { value: 'all', label: <span className="font-bold text-slate-800 dark:text-slate-300">{t('adminCustomers:tierAll', 'Tất cả hạng')}</span> },
        ...filterOptions.tiers.map(opt => ({
            value: opt.id,
            label: <span className="font-bold text-slate-800 dark:text-slate-300 uppercase tracking-widest">{opt.name}</span>
        }))
    ];

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Select 
                value={filterConfig.status}
                onChange={(value) => onFilterChange('status', value)}
                className="w-full sm:w-44 styled-custom-select"
                classNames={{ popup: 'dark:bg-[#141416] dark:text-white' }}
                options={statusOptions}
            />

            <Select 
                value={filterConfig.tier}
                onChange={(value) => onFilterChange('tier', value)}
                className="w-full sm:w-44 styled-custom-select"
                classNames={{ popup: 'dark:bg-[#141416] dark:text-white' }}
                options={tierOptions}
            />
        </div>
    );
};
