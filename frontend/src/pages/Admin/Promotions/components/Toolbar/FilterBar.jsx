import React from 'react';
import { Input, Select } from 'antd';
import { Search } from 'lucide-react';
import { FILTER_OPTIONS } from '../../constants/promotions.constants';

const { Option } = Select;

const FilterBar = ({ 
    searchText, 
    handleSearch, 
    filterStatus, 
    handleStatusChange,
    filterType,
    handleTypeChange,
    filterLoyalty,
    handleLoyaltyChange,
    t 
}) => {
    return (
        <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 p-4 sm:p-6 rounded-2xl mb-6 md:mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 shadow-sm">
            <div className="w-full lg:w-80">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                    {t('search_placeholder')}
                </label>
                <Input
                    prefix={<Search className="text-slate-400 dark:text-[#d3c5ac]/40" size={16} />}
                    placeholder={t('search_placeholder')}
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="h-12 rounded-full bg-slate-50 dark:bg-[#0a0a0b] border-transparent hover:border-slate-200 dark:hover:border-white/10 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto">
                <div className="w-full sm:w-40">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                        {t('lbl_status')}
                    </label>
                    <Select
                        value={filterStatus}
                        onChange={handleStatusChange}
                        className="w-full h-12 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-slate-200 focus:[&_.ant-select-selector]:!border-yellow-500"
                    >
                        {FILTER_OPTIONS.STATUS.map(opt => (
                            <Option key={opt.value} value={opt.value}>{t(opt.labelKey)}</Option>
                        ))}
                    </Select>
                </div>

                <div className="w-full sm:w-40">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                        {t('lbl_type')}
                    </label>
                    <Select
                        value={filterType}
                        onChange={handleTypeChange}
                        className="w-full h-12 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-slate-200 focus:[&_.ant-select-selector]:!border-yellow-500"
                    >
                        {FILTER_OPTIONS.TYPE.map(opt => (
                            <Option key={opt.value} value={opt.value}>{t(opt.labelKey)}</Option>
                        ))}
                    </Select>
                </div>

                <div className="w-full sm:w-40">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                        {t('lbl_category')}
                    </label>
                    <Select
                        value={filterLoyalty}
                        onChange={handleLoyaltyChange}
                        className="w-full h-12 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-slate-200 focus:[&_.ant-select-selector]:!border-yellow-500"
                    >
                        {FILTER_OPTIONS.CATEGORY.map(opt => (
                            <Option key={opt.value} value={opt.value}>{t(opt.labelKey)}</Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
