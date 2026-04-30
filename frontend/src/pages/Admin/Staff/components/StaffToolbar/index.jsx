import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Select } from 'antd';
import { getRoleFilterOptions, getStatusFilterOptions } from '../../constants/staffConstants';

const FilterSelect = ({ value, onChange, options }) => {
    return (
        <Select
            className="min-w-[170px] h-[54px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!rounded-full [&_.ant-select-selection-item]:text-slate-700 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-item]:mt-1.5 [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!uppercase [&_.ant-select-selection-item]:!tracking-wider"
            classNames={{ popup: "!bg-white dark:!bg-[#141416] [&_.ant-select-item]:!text-slate-700 dark:[&_.ant-select-item]:!text-slate-300 [&_.ant-select-item-option-selected]:!bg-yellow-50 dark:[&_.ant-select-item-option-selected]:!bg-yellow-500/10 [&_.ant-select-item-option-selected]:!text-yellow-600 dark:[&_.ant-select-item-option-selected]:!text-yellow-500" }}
            value={value}
            onChange={onChange}
            suffixIcon={<ChevronDown className="text-slate-400" size={18} />}
            options={options}
        />
    );
};

export const StaffToolbar = ({ filterRole, setFilterRole, filterStatus, setFilterStatus, searchTerm, setSearchTerm, t }) => {
    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/5 flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 shadow-sm">
            <div className="w-full xl:max-w-[320px] bg-slate-50 dark:bg-[#141416] border border-transparent dark:border-white/10 rounded-full h-[54px] px-5 flex items-center gap-3 shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-500/30 focus-within:border-yellow-500 relative group">
                <Search className="text-slate-400 group-focus-within:text-yellow-500 transition-colors shrink-0" size={20} />
                <input
                    type="text"
                    className="w-full bg-transparent border-none text-slate-700 dark:text-white placeholder:text-slate-400 focus:ring-0 outline-none"
                    placeholder={t('adminStaff:search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-4 flex-wrap xl:justify-end w-full xl:w-auto">
                <div className="relative">
                    <FilterSelect
                        value={filterRole}
                        onChange={setFilterRole}
                        options={getRoleFilterOptions(t)}
                    />
                </div>

                <div className="relative">
                    <FilterSelect
                        value={filterStatus}
                        onChange={setFilterStatus}
                        options={getStatusFilterOptions(t)}
                    />
                </div>
            </div>
        </div>
    );
};