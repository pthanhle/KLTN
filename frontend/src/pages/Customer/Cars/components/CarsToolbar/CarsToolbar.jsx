import { ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CarsToolbar = ({ isLoading, carsCount, totalCars, sort, handleSortChange, t }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="text-[14px] font-bold text-slate-500 dark:text-slate-400">
                {isLoading ? <Skeleton className="w-40 h-5" /> : (
                    <>
                        {t('cars.displaying', 'Hiển thị')} <span className="text-slate-900 dark:text-white">{carsCount}</span> {t('cars.outOf', 'trên')} <span className="text-slate-900 dark:text-white">{totalCars}</span> {t('cars.carsCount', 'xe')}
                    </>
                )}
            </div>

            <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-slate-400 tracking-wider">
                    {t('cars.sort.label', 'SẮP XẾP:')}
                </span>
                <div className="relative group/sort">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] font-bold text-slate-800 dark:text-white hover:border-yellow-500/50 transition-colors">
                        {sort === 'newest' ? t('cars.sort.newest', 'Mới nhất') : sort === 'price_asc' ? t('cars.sort.priceAsc', 'Giá: Thấp đến Cao') : t('cars.sort.priceDesc', 'Giá: Cao đến Thấp')}
                        <ChevronDown size={14} className="text-slate-400 group-hover/sort:text-yellow-500 transition-colors" />
                    </button>

                    {/* Dropdown Sort Menu */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0b0f19] border border-slate-100 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all z-10 translate-y-2 group-hover/sort:translate-y-0 py-2">
                        <button
                            onClick={() => handleSortChange('newest')}
                            className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors ${sort === 'newest' ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            {t('cars.sort.newest', 'Mới nhất')}
                        </button>
                        <button
                            onClick={() => handleSortChange('price_asc')}
                            className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors ${sort === 'price_asc' ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            {t('cars.sort.priceAsc', 'Giá: Thấp đến Cao')}
                        </button>
                        <button
                            onClick={() => handleSortChange('price_desc')}
                            className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors ${sort === 'price_desc' ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            {t('cars.sort.priceDesc', 'Giá: Cao đến Thấp')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarsToolbar;
