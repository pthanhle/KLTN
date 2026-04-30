import React from 'react';
import { Select } from 'antd';
import { ChevronDown } from 'lucide-react';

const FilterSelect = ({ value, onChange, options }) => {
    return (
        <Select 
            className="min-w-[170px] h-[54px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#141416] dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!rounded-full [&_.ant-select-selection-item]:text-slate-700 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-item]:mt-1.5 [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!uppercase [&_.ant-select-selection-item]:!tracking-wider"
            classNames={{ popup: "!bg-white dark:!bg-[#141416] [&_.ant-select-item]:!text-slate-700 dark:[&_.ant-select-item]:!text-slate-300 [&_.ant-select-item-option-selected]:!bg-yellow-50 dark:[&_.ant-select-item-option-selected]:!bg-yellow-500/10 [&_.ant-select-item-option-selected]:!text-yellow-600 dark:[&_.ant-select-item-option-selected]:!text-yellow-500" }}
            value={value}
            onChange={onChange}
            suffixIcon={<ChevronDown className="text-slate-400" size={18} />}
            options={options}
        />
    );
};

export default FilterSelect;
