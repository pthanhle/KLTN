import React from 'react';
import { Button, Input } from 'antd';
import { Download, Search } from 'lucide-react';
import { FilterSelects } from './components/FilterSelects';
import { useToolbarFilter } from './hooks/useToolbarFilter';

export const CustomerToolbar = ({ t }) => {
    const { filterConfig, filterOptions, handleFilterChange } = useToolbarFilter();

    return (
        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="relative w-full lg:max-w-md">
                <Input
                    size="large"
                    prefix={<Search size={18} className="text-slate-400 mr-1" />}
                    placeholder={t('adminCustomers:searchPlaceholder', 'Tìm kiếm khảch hàng...')}
                    value={filterConfig.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-[#141416] border-slate-200 dark:border-white/10 dark:text-slate-300 dark:hover:border-premium-gold dark:focus:border-premium-gold dark:placeholder-slate-500 font-medium w-full"
                />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end w-full lg:w-auto gap-4 lg:gap-6">
                <FilterSelects 
                    t={t} 
                    filterConfig={filterConfig} 
                    filterOptions={filterOptions}
                    onFilterChange={handleFilterChange} 
                />

                <Button 
                    size="large"
                    icon={<Download size={16} />} 
                    className="w-full sm:w-auto rounded-xl dark:bg-[#141416] dark:text-slate-300 dark:border-white/10 dark:hover:text-premium-gold dark:hover:border-premium-gold font-semibold shadow-sm"
                >
                    {t('adminCustomers:export', 'Xuất file')}
                </Button>
            </div>
        </div>
    );
};
