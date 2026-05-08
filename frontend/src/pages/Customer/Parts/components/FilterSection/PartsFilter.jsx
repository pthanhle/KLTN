import { useTranslation } from 'react-i18next';
import { Search, Check } from 'lucide-react';
import { Input, Button } from 'antd';

const PartsFilter = ({
    search, onSearchChange,
    selectedBrands, onBrandToggle,
    includeUniversal, onUniversalToggle,
    priceRange, onPriceChange, priceMax,
    activeCategory, onCategoryChange,
    allBrands, allCategories,
    brandsOption, brandSearch, onBrandSearchChange
}) => {
    const { t } = useTranslation('parts');

    return (
        <div className="flex flex-col gap-8 w-full">
            <Input 
                prefix={<Search size={16} className="text-slate-400 dark:text-slate-500 mr-2" />}
                placeholder={t('filter_search_placeholder', 'Tìm kiếm phụ tùng...')}
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                allowClear
                className="!rounded-xl !py-2.5 !px-4 !border-slate-200 dark:!border-white/10 dark:!bg-[#141416] dark:!text-white dark:placeholder:!text-slate-500 !text-[13px] hover:!border-yellow-500 focus-within:!border-yellow-500 !shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            />

            <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-[14px] mb-4">{t('filter_brand_title_full', 'Thương Hiệu Xe')}</h3>
                <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer group mb-4">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedBrands.length === 0 ? 'bg-yellow-500 border-yellow-500' : 'bg-white dark:bg-transparent border-slate-300 dark:border-white/20 group-hover:border-yellow-500'}`}>
                        {selectedBrands.length === 0 && <Check size={14} className="text-white dark:text-slate-900" strokeWidth={3} />}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors ${selectedBrands.length === 0 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                        {t('filter_brand_all', 'Tất cả thương hiệu')}
                    </span>
                    <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedBrands.length === 0}
                        onChange={() => onBrandToggle(null)} 
                    />
                </label>

                    {allBrands.length > 5 && (
                        <div className="relative mb-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500 z-10" />
                            <input 
                                type="text"
                                placeholder={t('filter_brand_search', 'Tìm thương hiệu...')}
                                value={brandSearch || ''}
                                onChange={e => onBrandSearchChange(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/5 rounded-xl text-[13px] font-medium text-slate-700 dark:text-white outline-none focus:border-yellow-500/30 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                        {brandsOption.map(brand => {
                            const isChecked = selectedBrands.includes(brand.id);
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
                                    <span className="text-[12px] font-bold text-slate-300 dark:text-slate-600">{brand.count || 0}</span>
                                    <input 
                                        type="checkbox" 
                                        className="hidden" 
                                        checked={isChecked}
                                        onChange={() => onBrandToggle(brand.id)} 
                                    />
                                </label>
                            );
                        })}
                    </div>

                    {selectedBrands.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 ${includeUniversal ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white' : 'bg-white dark:bg-transparent border-slate-300 dark:border-white/20 group-hover:border-slate-500 dark:group-hover:border-white/50'}`}>
                                    {includeUniversal && <Check size={14} className="text-white dark:text-slate-900" strokeWidth={3} />}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[13px] font-bold transition-colors ${includeUniversal ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`}>
                                        {t('filter_universal_parts', 'Kèm phụ tùng dùng chung')}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-medium leading-snug mt-1">
                                        {t('filter_universal_desc', 'Hiển thị thêm các phụ tùng không kén dòng xe (nhớt, camera,...)')}
                                    </span>
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={includeUniversal}
                                    onChange={onUniversalToggle} 
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-[14px] mb-4">{t('filter_price_title_full', 'Khoảng Giá (VND)')}</h3>
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1">
                        <input 
                            type="number"
                            placeholder={t('filter_price_from', 'Từ')}
                            value={priceRange[0] || ''}
                            onChange={e => onPriceChange([Number(e.target.value) || 0, priceRange[1]])}
                            className="w-full px-4 py-2 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] font-medium text-slate-800 dark:text-white outline-none focus:border-yellow-500/50 transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <span className="text-slate-300 dark:text-slate-600">-</span>
                    <div className="flex-1">
                        <input 
                            type="number"
                            placeholder={t('filter_price_to', 'Đến')}
                            value={priceRange[1] === priceMax ? '' : priceRange[1]}
                            onChange={e => onPriceChange([priceRange[0], Number(e.target.value) || priceMax])}
                            className="w-full px-4 py-2 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] font-medium text-slate-800 dark:text-white outline-none focus:border-yellow-500/50 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>
                <div className="text-[11px] font-bold text-slate-400 italic text-right mt-2 pr-1">{t('filter_price_unit', 'Đơn vị: VNĐ')}</div>
            </div>

            <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-[14px] mb-4">{t('filter_category_title', 'Danh Mục')}</h3>
                <div className="flex flex-wrap gap-2">
                    {[{ id: 'all', name: t('category_all', 'Tất Cả') }, ...allCategories].map(cat => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all border ${
                                    isActive 
                                        ? 'bg-yellow-500 text-white border-yellow-500 shadow-[0_2px_10px_rgba(234,179,8,0.3)]' 
                                        : 'bg-white dark:bg-[#141416] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/30'
                                }`}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Button className="!w-full !py-6 !bg-[#0f172a] hover:!bg-slate-800 dark:!bg-white dark:hover:!bg-white/90 !text-white dark:!text-slate-900 !rounded-xl !text-[14px] !font-bold !border-none mt-2 !shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                {t('filter_apply', 'Lọc Kết Quả')}
            </Button>
        </div>
    );
};

export default PartsFilter;
