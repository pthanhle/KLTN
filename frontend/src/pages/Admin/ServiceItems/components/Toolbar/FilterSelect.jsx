import React from 'react';
import { Select } from 'antd';

const FilterSelect = ({ value, onChange, options, placeholder, className }) => {
    return (
        <Select
            value={value || undefined}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            allowClear
            className={`!w-full md:!w-64 !h-[48px] [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!bg-white dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500/50 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:!text-[14px] [&_.ant-select-selection-item]:!font-medium [&_.ant-select-selection-item]:!text-slate-900 dark:[&_.ant-select-selection-item]:!text-white [&_.ant-select-arrow]:!text-slate-400 ${className || ''}`}
        />
    );
};

export default FilterSelect;
