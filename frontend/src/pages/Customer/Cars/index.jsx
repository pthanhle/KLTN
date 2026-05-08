import { useTranslation } from 'react-i18next';
import { useCarsLogic } from './hooks/useCarsLogic';
import SidebarFilter from './components/SidebarFilter';
import BrandPagination from '../Products/components/BrandSection/BrandPagination';
import CarsHeader from './components/CarsHeader/CarsHeader';
import CarsToolbar from './components/CarsToolbar/CarsToolbar';
import CarsGrid from './components/CarsGrid/CarsGrid';
import { SlidersHorizontal } from 'lucide-react';

const CarsPage = () => {
    const { t } = useTranslation('customerCars');
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
        ? `${t('titleBrand', 'Khám Phá')} ${brandNameParam.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`
        : t('titleAll', 'Tất Cả Dòng Xe');

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            <CarsHeader title={title} brandNameParam={brandNameParam} t={t} />

            <div className="border-t border-slate-100 dark:border-white/5 py-12">
                <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
                        <aside className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
                            <div className="sticky top-28 bg-white dark:bg-[#141416] p-6 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                                <div className="flex items-center gap-3 mb-8">
                                    <SlidersHorizontal size={20} className="text-yellow-500" strokeWidth={2.5} />
                                    <h2 className="text-lg font-black text-slate-900 dark:text-white">{t('filters.title', 'Bộ lọc tìm kiếm')}</h2>
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

                        <main className="flex-1 min-w-0">
                            <CarsToolbar 
                                isLoading={isLoading}
                                carsCount={cars.length}
                                totalCars={totalCars}
                                sort={sort}
                                handleSortChange={handleSortChange}
                                t={t}
                            />

                            <CarsGrid 
                                isLoading={isLoading}
                                isFiltering={isFiltering}
                                cars={cars}
                                t={t}
                            />

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
