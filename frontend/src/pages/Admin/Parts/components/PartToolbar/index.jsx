import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Select } from 'antd';

const PartToolbar = ({ searchTerm, onSearch, categoryFilter, onCategoryFilter, brandFilter, onBrandFilter, categories, brands, t }) => {
    return (
        <div className="bg-white dark:bg-[#191f31] rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/5 flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[300px] relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    className="w-full bg-slate-50 dark:bg-[#151b2d] border-none rounded-full py-4 pl-12 pr-6 text-slate-700 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500/50 transition-all outline-none" 
                    placeholder={t('adminParts:searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                    <Select 
                        className="min-w-[180px] h-[54px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#151b2d] [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!rounded-full [&_.ant-select-selection-item]:text-slate-700 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-item]:mt-1.5 [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!uppercase [&_.ant-select-selection-item]:!tracking-wider"
                        popupClassName="!bg-white dark:!bg-[#191f31] [&_.ant-select-item]:!text-slate-700 dark:[&_.ant-select-item]:!text-slate-300 [&_.ant-select-item-option-selected]:!bg-yellow-50 dark:[&_.ant-select-item-option-selected]:!bg-yellow-500/10 [&_.ant-select-item-option-selected]:!text-yellow-600 dark:[&_.ant-select-item-option-selected]:!text-yellow-500"
                        value={categoryFilter}
                        onChange={onCategoryFilter}
                        suffixIcon={<ChevronDown className="text-slate-400" size={18} />}
                        options={[
                            { label: t('adminParts:filterCategory'), value: 'all' },
                            ...categories.map(c => ({ label: c, value: c }))
                        ]}
                    />
                </div>
                
                <div className="relative">
                    <Select 
                        className="min-w-[180px] h-[54px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#151b2d] [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!rounded-full [&_.ant-select-selection-item]:text-slate-700 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-item]:mt-1.5 [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!uppercase [&_.ant-select-selection-item]:!tracking-wider"
                        popupClassName="!bg-white dark:!bg-[#191f31] [&_.ant-select-item]:!text-slate-700 dark:[&_.ant-select-item]:!text-slate-300 [&_.ant-select-item-option-selected]:!bg-yellow-50 dark:[&_.ant-select-item-option-selected]:!bg-yellow-500/10 [&_.ant-select-item-option-selected]:!text-yellow-600 dark:[&_.ant-select-item-option-selected]:!text-yellow-500"
                        value={brandFilter}
                        onChange={onBrandFilter}
                        suffixIcon={<ChevronDown className="text-slate-400" size={18} />}
                        options={[
                            { label: t('adminParts:filterBrand'), value: 'all' },
                            ...brands.map(b => ({ label: b, value: b }))
                        ]}
                    />
                </div>
                
                <button className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-50 dark:bg-[#151b2d] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200 dark:border-white/5">
                    <Filter className="text-slate-500 dark:text-slate-400" size={20} />
                </button>
            </div>
        </div>
    );
};

export default PartToolbar;
