import { useTranslation } from 'react-i18next';
import CategoryTopNav from './components/Shared/CategoryTopNav';
import BrandSearch from './components/BrandSection/BrandSearch';
import AlphabetFilter from './components/BrandSection/AlphabetFilter';
import BrandCard, { BrandCardSkeleton } from './components/BrandSection/BrandCard'; // Retaining BrandCardSkeleton as it's used and not explicitly removed by instruction
import BrandPagination from './components/BrandSection/BrandPagination';
import SidebarFilter from './components/ProductSection/SidebarFilter';
import ProductGrid from './components/ProductSection/ProductGrid';
import { useProductsLogic } from './hooks/useProductsLogic';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsPage = () => {
    const { t } = useTranslation('products');
    const {
        isInitialLoading,
        isFiltering,
        search,
        paginatedBrands,
        filteredBrandsLength,
        activeLetter,
        currentPage,
        totalPages,
        handleSearchChange,
        handleLetterChange,
        handlePageChange,
    } = useProductsLogic();

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300 flex flex-col items-center w-full">
            <div className="w-full pt-16 lg:pt-20">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center px-4 mb-10 space-y-5">
                    <h1 className="text-[38px] md:text-[44px] font-[900] tracking-tight text-slate-900 dark:text-white inline-flex gap-3">
                        {isInitialLoading ? <Skeleton className="h-12 w-[340px]" /> : (
                            <>
                                {t('titleNormal')} 
                                <span className="text-yellow-500">{t('titleHighlight')}</span>
                            </>
                        )}
                    </h1>
                    <div className="text-[14px] md:text-[15px] text-slate-500 dark:text-slate-400 font-medium max-w-[600px] leading-[1.6]">
                        {isInitialLoading ? (
                            <div className="space-y-2 mt-2">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                                <Skeleton className="h-4 w-1/2 mx-auto" />
                            </div>
                        ) : (
                            t('subtitle')
                        )}
                    </div>
                </div>

                {/* Search Bar Section */}
                <div className="px-4 w-full">
                    <BrandSearch 
                        search={search}
                        onSearchChange={handleSearchChange}
                        placeholder={t('searchBrandPlaceholder')}
                        isLoading={isInitialLoading}
                        isFiltering={isFiltering}
                    />
                </div>

                {/* Alphabet Filter (Full Width Stripe) */}
                <AlphabetFilter 
                    activeLetter={activeLetter}
                    onLetterChange={handleLetterChange}
                    isLoading={isInitialLoading}
                />
            </div>

            {/* Main Grid Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1280px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {isInitialLoading || isFiltering ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <BrandCardSkeleton key={i} />
                        ))
                    ) : paginatedBrands.length > 0 ? (
                        paginatedBrands.map(brand => (
                            <BrandCard key={brand.id} brand={brand} t={t} />
                        ))
                    ) : (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-white dark:bg-[#141416] rounded-[32px] border border-dashed border-slate-200 dark:border-white/10">
                            <p className="text-xl text-slate-700 dark:text-slate-200 font-bold mb-3">{t('noBrandsFound')}</p>
                            <p className="text-[15px] text-slate-400 dark:text-slate-500">{t('noBrandsDesc')}</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!isInitialLoading && !isFiltering && filteredBrandsLength > 0 && (
                    <BrandPagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
            
            {/* Very Bottom Spacing Fix for the page */}
            <div className="h-10 w-full" />
        </div>
    );
};

export default ProductsPage;
