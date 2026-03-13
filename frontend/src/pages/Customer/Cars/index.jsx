import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCarsLogic } from './hooks/useCarsLogic';
import SidebarFilter from './components/SidebarFilter';
import CarCard, { CarCardSkeleton } from './components/CarCard';
import BrandPagination from '../Products/components/BrandSection/BrandPagination';
import { ChevronRight, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CarsPage = () => {
    const { t } = useTranslation('products');
    const {
        brandNameParam,
        isLoading,
        isFiltering,
        cars,
        totalCars,
        currentPage,
        totalPages,
        filters,
        sort,
        handleFilterChange,
        handleBrandToggle,
        handleSelectAllBrands,
        handlePageChange,
        handleSortChange,
        brandsData,
        bodyStylesData,
    } = useCarsLogic();

    const title = brandNameParam
        ? `${t('cars.titleBrand')} ${brandNameParam.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`
        : t('cars.titleAll');

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            {/* Minimalist Top Breadcrumb & Header */}
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px] pt-24 pb-12">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400 dark:text-slate-500 mb-6">
                    <Link to="/" className="!text-slate-400 dark:!text-slate-500 hover:!text-yellow-500 transition-colors">{t('layout:customer.header.home')}</Link>
                    <ChevronRight size={14} />
                    <Link to="/products" className="!text-slate-400 dark:!text-slate-500 hover:!text-yellow-500 transition-colors">{t('layout:customer.header.categories')}</Link>
                    {brandNameParam && (
                        <>
                            <ChevronRight size={14} />
                            <span className="text-slate-800 dark:text-white capitalize">{brandNameParam.replace('-', ' ')}</span>
                        </>
                    )}
                </div>

                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900 dark:text-white capitalize mb-4">
                        {title}
                    </h1>
                    <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t('cars.description')}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="border-t border-slate-100 dark:border-white/5 py-12">
                <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

                        {/* Sidebar Left (25%) */}
                        <aside className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
                            <div className="sticky top-28 bg-white dark:bg-[#0b0f19] p-6 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                                <div className="flex items-center gap-3 mb-8">
                                    <SlidersHorizontal size={20} className="text-yellow-500" strokeWidth={2.5} />
                                    <h2 className="text-lg font-black text-slate-900 dark:text-white">Bộ lọc tìm kiếm</h2>
                                </div>
                                <SidebarFilter
                                    filters={filters}
                                    handleFilterChange={handleFilterChange}
                                    handleBrandToggle={handleBrandToggle}
                                    handleSelectAllBrands={handleSelectAllBrands}
                                    brandsData={brandsData}
                                    bodyStylesData={bodyStylesData}
                                    t={t}
                                />
                            </div>
                        </aside>

                        {/* Content Right (75%) */}
                        <main className="flex-1 min-w-0">

                            {/* Toolbar (Amount & Sort) */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div className="text-[14px] font-bold text-slate-500 dark:text-slate-400">
                                    {isLoading ? <Skeleton className="w-40 h-5" /> : (
                                        <>
                                            {t('cars.displaying')} <span className="text-slate-900 dark:text-white">{cars.length}</span> {t('cars.outOf')} <span className="text-slate-900 dark:text-white">{totalCars}</span> {t('cars.carsCount')}
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] font-bold text-slate-400 tracking-wider">
                                        {t('cars.sort.label')}
                                    </span>
                                    <div className="relative group/sort">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] font-bold text-slate-800 dark:text-white hover:border-yellow-500/50 transition-colors">
                                            {sort === 'newest' ? t('cars.sort.newest') : sort === 'priceAsc' ? t('cars.sort.priceAsc') : t('cars.sort.priceDesc')}
                                            <ChevronDown size={14} className="text-slate-400 group-hover/sort:text-yellow-500 transition-colors" />
                                        </button>

                                        {/* Dropdown Sort Menu */}
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0b0f19] border border-slate-100 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all z-10 translate-y-2 group-hover/sort:translate-y-0 py-2">
                                            <button
                                                onClick={() => handleSortChange('newest')}
                                                className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors ${sort === 'newest' ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                            >
                                                {t('cars.sort.newest')}
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('priceAsc')}
                                                className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors ${sort === 'priceAsc' ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                            >
                                                {t('cars.sort.priceAsc')}
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('priceDesc')}
                                                className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors ${sort === 'priceDesc' ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                            >
                                                {t('cars.sort.priceDesc')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product List Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {isLoading || isFiltering ? (
                                    Array.from({ length: 9 }).map((_, i) => (
                                        <CarCardSkeleton key={i} />
                                    ))
                                ) : cars.length > 0 ? (
                                    cars.map(car => (
                                        <CarCard key={car.id} car={car} t={t} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white dark:bg-[#141416] rounded-[32px] border border-dashed border-slate-200 dark:border-white/10">
                                        <p className="text-2xl text-slate-700 dark:text-slate-200 font-black tracking-tight mb-3">{t('cars.noCarsFound')}</p>
                                        <p className="text-[15px] font-medium text-slate-400 dark:text-slate-500">{t('cars.noCarsDesc')}</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination (Re-used) */}
                            {!isLoading && !isFiltering && totalCars > 0 && (
                                <BrandPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}

                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarsPage;
