import { useState } from 'react';
import { Search, Check } from 'lucide-react';

const SidebarFilter = ({ filters, handleFilterChange, handleBrandToggle, handleSelectAllBrands, brandsData, bodyStylesData, t }) => {
    // Local state for searching within the brand list to handle many brands gracefully
    const [brandSearch, setBrandSearch] = useState('');

    const filteredBrandsList = brandsData.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()));

    return (
        <div className="w-full flex flex-col gap-8 pr-0 lg:pr-6">
            
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                <input 
                    type="text" 
                    placeholder={t('filters_searchPlaceholder', 'Tìm kiếm mẫu xe...')}
                    value={filters.keyword}
                    onChange={(e) => handleFilterChange('keyword', e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-2xl text-[14px] font-medium text-slate-800 dark:text-white outline-none focus:border-yellow-500/50 shadow-sm transition-all"
                />
            </div>

            {/* Brands Filter */}
            <div>
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-4">{t('filters_brandsTitle', 'Thương Hiệu')}</h3>
                
                {/* Checkbox "Tất cả" */}
                <label className="flex items-center gap-3 cursor-pointer group mb-4">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${filters.brandSlugs.length === 0 ? 'bg-yellow-500 border-yellow-500' : 'bg-white dark:bg-transparent border-slate-300 dark:border-white/20 group-hover:border-yellow-500'}`}>
                        {filters.brandSlugs.length === 0 && <Check size={14} className="text-white dark:text-slate-900" strokeWidth={3} />}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors ${filters.brandSlugs.length === 0 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                        {t('filters_allBrands', 'Tất cả thương hiệu')}
                    </span>
                    <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={filters.brandSlugs.length === 0}
                        onChange={handleSelectAllBrands} 
                    />
                </label>

                {/* Sub-search for long lists of brands */}
                {brandsData.length > 5 && (
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                        <input 
                            type="text" 
                            placeholder={t('filters_searchBrandPlaceholder', 'Tìm thương hiệu...')}
                            value={brandSearch}
                            onChange={e => setBrandSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-white/5 rounded-xl text-[13px] font-medium text-slate-700 dark:text-white outline-none focus:border-yellow-500/30 transition-all placeholder:text-slate-400"
                        />
                    </div>
                )}

                {/* Scrollable list of brands (custom scrollbar utility class) */}
                <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredBrandsList.map(brand => {
                        const isChecked = filters.brandSlugs.includes(brand.slug);
                        return (
                            <label key={brand.id} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${isChecked ? 'bg-yellow-500 border-yellow-500' : 'bg-white dark:bg-transparent border-slate-300 dark:border-white/20 group-hover:border-yellow-500'}`}>
                                        {isChecked && <Check size={14} className="text-white dark:text-slate-900" strokeWidth={3} />}
                                    </div>
                                    <span className={`text-[14px] font-medium transition-colors ${isChecked ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                        {brand.name}
                                    </span>
                                </div>
                                <span className="text-[12px] font-bold text-slate-300 dark:text-slate-600">{brand.count}</span>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={isChecked}
                                    onChange={() => handleBrandToggle(brand.slug)} 
                                />
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="w-full h-[1px] bg-slate-100 dark:bg-white/5"></div>

            {/* Price Filter */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">{t('filters_priceTitle', 'Khoảng Giá (VND)')}</h3>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1">
                        <input 
                            type="number" 
                            placeholder={t('filters_from', 'Từ')}
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] font-medium text-slate-800 dark:text-white outline-none focus:border-yellow-500/50 transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <span className="text-slate-300 dark:text-slate-600">-</span>
                    <div className="flex-1">
                        <input 
                            type="number" 
                            placeholder={t('filters_to', 'Đến')}
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] font-medium text-slate-800 dark:text-white outline-none focus:border-yellow-500/50 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>
                <p className="text-[11px] font-bold text-slate-400 italic text-right">{t('filters_unit', 'Đơn vị: VNĐ')}</p>
            </div>

            <div className="w-full h-[1px] bg-slate-100 dark:bg-white/5"></div>

            {/* Body Styles (Pills) */}
            <div>
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-4">{t('filters_bodyStylesTitle', 'Kiểu Dáng')}</h3>
                <div className="flex flex-wrap gap-2.5">
                    {bodyStylesData.map(style => {
                        const isActive = filters.bodyStyle === style.value;
                        return (
                            <button
                                key={style.value}
                                onClick={() => handleFilterChange('bodyStyle', style.value)}
                                className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-yellow-500 text-white dark:text-slate-900 shadow-md shadow-yellow-500/20' 
                                        : 'bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/30'
                                }`}
                            >
                                {style.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Reset Filter Button for easy access */}
            <button 
                onClick={() => {
                    handleSelectAllBrands();
                    handleFilterChange('keyword', '');
                    handleFilterChange('minPrice', '');
                    handleFilterChange('maxPrice', '');
                    handleFilterChange('bodyStyle', 'Tất cả');
                }}
                className="mt-6 w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[14px] font-bold rounded-2xl hover:bg-yellow-500 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-slate-900 transition-colors shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_rgba(255,255,255,0.05)]"
            >
                {t('filters_resetFilter', 'Bỏ lọc')}
            </button>

        </div>
    );
};

export default SidebarFilter;
