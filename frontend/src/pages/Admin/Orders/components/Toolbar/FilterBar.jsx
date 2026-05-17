import React from 'react';
import { Input, Select } from 'antd';
import { Search } from 'lucide-react';
import { FILTER_DEFAULT_VALUE, ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from '../../constants/filterOptions';

export const FilterBar = ({ 
    searchText, onSearch, 
    filterStatus, setFilterStatus, 
    filterPayment, setFilterPayment,
    t 
}) => {
    return (
        <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 p-4 sm:p-6 rounded-2xl mb-6 md:mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 shadow-sm">
            {/* Search Area */}
            <div className="w-full lg:w-80">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                    {t('search_placeholder', 'Tìm kiếm mã đơn, số điện thoại...')}
                </label>
                <Input
                    prefix={<Search className="text-slate-400 dark:text-[#d3c5ac]/40" size={16} />}
                    placeholder={t('search_placeholder', 'Tìm kiếm mã đơn, số điện thoại...')}
                    value={searchText}
                    onChange={(e) => onSearch(e.target.value)}
                    className="h-12 rounded-full"
                />
            </div>
            
            {/* Filters Area */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto">
                <div className="w-full sm:w-48">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                        {t('col_status', 'Trạng thái')}
                </label>
                <Select 
                    value={filterStatus}
                    onChange={setFilterStatus}
                    className="w-full h-12"
                    options={[
                        { value: FILTER_DEFAULT_VALUE, label: t('tab_all', 'Tất cả') },
                        ...ORDER_STATUS_OPTIONS.map(opt => ({
                            value: opt.value,
                            label: t(opt.labelKey)
                        }))
                    ]}
                />
                </div>
                
                <div className="w-full sm:w-48">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                        {t('col_payment', 'Thanh toán')}
                </label>
                <Select 
                    value={filterPayment}
                    onChange={setFilterPayment}
                    className="w-full h-12"
                    options={[
                        { value: FILTER_DEFAULT_VALUE, label: t('tab_all', 'Tất cả') },
                        ...PAYMENT_STATUS_OPTIONS.map(opt => ({
                            value: opt.value,
                            label: t(opt.labelKey)
                        }))
                    ]}
                />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
