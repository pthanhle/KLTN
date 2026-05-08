import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Select, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { FILTER_STATUS_OPTIONS, FILTER_TYPE_OPTIONS } from '../constants/testDriveBookingConstants';

const FilterSelect = ({ value, onChange, options }) => {
    return (
        <Select
            className="min-w-[170px] h-[54px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selection-item]:text-slate-700 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-item]:mt-1.5 [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!uppercase [&_.ant-select-selection-item]:!tracking-wider"
            classNames={{ popup: "!bg-white dark:!bg-[#141416] [&_.ant-select-item]:!text-slate-700 dark:[&_.ant-select-item]:!text-slate-300 [&_.ant-select-item-option-selected]:!bg-yellow-50 dark:[&_.ant-select-item-option-selected]:!bg-yellow-500/10 [&_.ant-select-item-option-selected]:!text-yellow-600 dark:[&_.ant-select-item-option-selected]:!text-yellow-500" }}
            value={value}
            onChange={onChange}
            suffixIcon={<ChevronDown className="text-slate-400" size={18} />}
            options={options}
        />
    );
};

export const TestDriveToolbar = ({ filters, onFilterChange, t }) => {
    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/5 flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 shadow-sm">
            <div className="flex items-center gap-6 w-full xl:w-auto">

                <div className="w-full xl:max-w-[320px] bg-slate-50 dark:bg-[#1f1f23] border border-transparent dark:border-white/10 rounded-full h-[54px] px-5 flex items-center gap-3 shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-500/30 focus-within:border-yellow-500 relative group">
                    <Search className="text-slate-400 group-focus-within:text-yellow-500 transition-colors shrink-0" size={20} />
                    <input
                        type="text"
                        className="w-full bg-transparent border-none text-slate-700 dark:text-white placeholder:text-slate-400 focus:ring-0 outline-none"
                        placeholder={t('adminTestDriveBookings:filter_search_placeholder', 'Tìm theo tên hoặc SĐT...')}
                        value={filters.search}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap xl:justify-end w-full xl:w-auto">
                <div className="relative">
                    <DatePicker
                        className="h-[54px] min-w-[150px] !bg-slate-50 dark:!bg-[#141416] !border !border-slate-200 dark:!border-white/10 !rounded-full [&_input]:!text-slate-700 dark:[&_input]:!text-white [&_input]:!font-bold px-5 shadow-sm hover:!bg-slate-100 dark:hover:!bg-[#1a1a1c] transition-colors [&_.ant-picker-input_input::placeholder]:!text-slate-400 dark:[&_.ant-picker-input_input::placeholder]:!text-slate-500 [&_.ant-picker-suffix]:!text-slate-400"
                        format="DD/MM/YYYY"
                        value={filters.date ? dayjs(filters.date, 'DD/MM/YYYY') : null}
                        onChange={(date, dateString) => onFilterChange('date', dateString || '')}
                        placeholder={t('adminTestDriveBookings:filter_date_placeholder', 'Ngày Lái Thử')}
                        allowClear={true}
                    />
                </div>

                <div className="relative">
                    <FilterSelect
                        value={filters.type}
                        onChange={(val) => onFilterChange('type', val)}
                        options={FILTER_TYPE_OPTIONS.map(opt => ({
                            value: opt.value,
                            label: t(opt.labelKey)
                        }))}
                    />
                </div>

                <div className="relative">
                    <FilterSelect
                        value={filters.status}
                        onChange={(val) => onFilterChange('status', val)}
                        options={FILTER_STATUS_OPTIONS.map(opt => ({
                            value: opt.value,
                            label: t(opt.labelKey)
                        }))}
                    />
                </div>
            </div>
        </div>
    );
};
