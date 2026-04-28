import React from 'react';
import { Filter, Search, Rows } from 'lucide-react';
import FilterSelect from './FilterSelect';

const Toolbar = ({
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    selectedPriceType, setSelectedPriceType,
    categoryOptions, priceOptions,
    t
}) => {
    // Map options to include an "All" option at the top
    const mappedCategoryOptions = [
        { value: '', label: t('adminServiceItems:filter_category_all', 'Tất cả Danh mục') },
        ...categoryOptions
    ];

    const mappedPriceOptions = [
        { value: '', label: t('adminServiceItems:filter_price_all', 'Tất cả Loại giá') },
        ...priceOptions
    ];

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 w-full">
            <h2 className="text-xl font-bold flex items-center gap-3 text-slate-900 dark:text-white hidden md:flex shrink-0">
                <Rows className="text-yellow-600 dark:text-yellow-500" size={24} />
                {t('adminServiceItems:list_title', 'Danh Sách Hạng Mục')}
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                <div className="w-full md:w-80 bg-white dark:bg-white/10 rounded-full h-11 px-5 flex items-center gap-3 border border-slate-200 dark:border-[#9b8f79]/15 shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-500/30 focus-within:border-yellow-500">
                    <Search size={18} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('adminServiceItems:search_placeholder', 'Tìm kiếm theo Tên/SKU...')}
                        className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-800 dark:text-white placeholder-slate-400 outline-none"
                    />
                </div>

                <FilterSelect
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={mappedCategoryOptions}
                    placeholder={t('adminServiceItems:filter_category_all', 'Tất cả Danh mục')}
                    className="!w-full md:!w-48 !h-11 [&_.ant-select-selector]:!h-11"
                />

                <FilterSelect
                    value={selectedPriceType}
                    onChange={setSelectedPriceType}
                    options={mappedPriceOptions}
                    placeholder={t('adminServiceItems:filter_price_all', 'Tất cả Loại giá')}
                    className="!w-full md:!w-48 !h-11 [&_.ant-select-selector]:!h-11"
                />
            </div>
        </div>
    );
};

export default Toolbar;
