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
            className={`!w-full md:!w-48 !h-11 [&_.ant-select-selector]:!h-11 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-yellow-500/50 [&_.ant-select-selection-item]:!leading-[42px] [&_.ant-select-selection-item]:!text-[14px] [&_.ant-select-selection-item]:!font-medium [&_.ant-select-selection-item]:!text-slate-700 dark:[&_.ant-select-selection-item]:!text-white [&_.ant-select-arrow]:!text-slate-400 ${className || ''}`}
        />
    );
};

export default FilterSelect;
