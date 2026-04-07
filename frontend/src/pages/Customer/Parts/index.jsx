import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Select } from 'antd';
import PartsFilter from './components/FilterSection/PartsFilter';
import PartGrid from './components/PartSection/PartGrid';
import { usePartsLogic } from './hooks/usePartsLogic';

const PartsPage = () => {
    const { t } = useTranslation('parts');
    const {
        isLoading,
        isFiltering,
        search,
        activeCategory,
        selectedBrands,
        includeUniversal,
        priceRange,
        sortBy,
        currentPage,
        totalPages,
        paginatedParts,
        totalCount,
        allBrands,
        allCategories,
        sortOptions,
        priceMax,
        brandSearch,
        brandsOption,
        setSearch,
        setActiveCategory,
        handleBrandToggle,
        setIncludeUniversal,
        setPriceRange,
        setSortBy,
        setCurrentPage,
        setBrandSearch,
    } = usePartsLogic();

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px] pt-24 pb-12">
                
                <div className="flex items-center gap-2 text-[13px] font-bold mb-6">
                    <Link to="/" className="!text-slate-900 dark:!text-white hover:!text-yellow-500 transition-colors">
                        {t('breadcrumb_home', 'Trang chủ')}
                    </Link>
                    <span className="text-slate-400 font-normal">/</span>
                    <span className="text-yellow-500 font-bold">{t('breadcrumb_parts', 'Linh kiện')}</span>
                </div>

                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900 dark:text-white capitalize mb-4">
                        <span className="text-yellow-500 font-bold">{t('page_title1', 'Linh Kiện & Phụ Tùng')}</span> <span className="font-[900]">{t('page_title2', 'Cao Cấp')}</span>
                    </h1>
                    <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t('page_desc', 'Phân phối linh kiện chính hãng cho các dòng xe hạng sang. Đảm bảo hiệu suất tối ưu và độ bền vượt trội cho xế yêu của bạn.')}
                    </p>
                </div>
            </div>

            <div className="border-t border-slate-100 dark:border-white/5 py-12">
                <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
                        
                        <aside className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
                            <div className="sticky top-28 bg-white dark:bg-[#0b0f19] p-6 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                                <div className="flex items-center gap-3 mb-8">
                                    <h2 className="text-lg font-black text-slate-900 dark:text-white">{t('filter_label', 'Bộ lọc tìm kiếm')}</h2>
                                </div>
                                <PartsFilter
                            search={search}
                            onSearchChange={setSearch}
                            selectedBrands={selectedBrands}
                            onBrandToggle={handleBrandToggle}
                            includeUniversal={includeUniversal}
                            onUniversalToggle={() => setIncludeUniversal(v => !v)}
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            allBrands={allBrands}
                            allCategories={allCategories}
                            brandsOption={brandsOption}
                            brandSearch={brandSearch}
                            onBrandSearchChange={setBrandSearch}
                            priceMax={priceMax}
                        />
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div className="text-[14px] font-bold text-slate-500 dark:text-slate-400">
                                {t('showing_results', 'Hiển thị')} <span className="text-slate-900 dark:text-white">{paginatedParts.length}</span> {t('out_of', 'trên')} <span className="text-slate-900 dark:text-white">{totalCount}</span> {t('products', 'sản phẩm')}
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-[12px] font-bold text-slate-400 tracking-wider uppercase">
                                    {t('sort_by', 'SẮP XẾP:')}
                                </span>
                                <div className="relative group/sort z-50">
                                    <button className="flex items-center justify-between min-w-[140px] px-4 py-2 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] font-bold text-slate-800 dark:text-white hover:border-yellow-500/50 transition-colors">
                                        {t(`sort_${sortBy}`)}
                                        <ChevronDown size={14} className="text-slate-400 group-hover/sort:text-yellow-500 transition-colors ml-2" />
                                    </button>

                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0b0f19] border border-slate-100 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all z-50 translate-y-2 group-hover/sort:translate-y-0 py-2">
                                        {sortOptions.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setSortBy(opt)}
                                                className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors ${sortBy === opt ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                            >
                                                {t(`sort_${opt}`)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                            <PartGrid
                                isLoading={isLoading}
                                isFiltering={isFiltering}
                                parts={paginatedParts}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartsPage;
