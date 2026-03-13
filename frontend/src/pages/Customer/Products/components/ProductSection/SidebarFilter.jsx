import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const SidebarFilter = ({ 
    t, 
    isLoading, 
    search, 
    onSearchChange,
    brandSearch,
    onBrandSearchChange,
    brandsOption,
    selectedBrands,
    onBrandToggle 
}) => {
    
    // Abstract Card Layout for DRY pattern
    const FilterCard = ({ title, isLoading, children }) => (
        <div className="bg-white dark:bg-[#141416] p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-100 dark:border-white/5 transition-colors">
            <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-5 font-mono">
                {isLoading ? <Skeleton className="h-4 w-32" /> : title}
            </h4>
            <div className="w-full">
                {children}
            </div>
        </div>
    );

    return (
        <aside className="w-full flex flex-col space-y-6">
            
            {/* General Search Card */}
            <FilterCard title={t('filters.search')} isLoading={isLoading}>
                {isLoading ? (
                    <Skeleton className="h-11 w-full rounded-xl" />
                ) : (
                    <div className="relative flex items-center group">
                        <Search className="absolute left-3.5 w-[18px] h-[18px] text-slate-400 group-focus-within:text-yellow-500 transition-colors" strokeWidth={2.5} />
                        <input 
                            type="text" 
                            placeholder={t('searchPlaceholder')}
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-[42px] pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl text-[13px] font-medium text-slate-800 dark:text-white outline-none focus:border-yellow-500/50 dark:focus:border-premium-gold/50 focus:bg-white dark:focus:bg-[#1a1a1c] transition-all placeholder:text-slate-400"
                        />
                    </div>
                )}
            </FilterCard>

            {/* Brands Card */}
            <FilterCard title={t('filters.brands')} isLoading={isLoading}>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full rounded-xl" />
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <Skeleton className="h-5 w-2/3" />
                                <Skeleton className="h-5 w-8 rounded-lg" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col space-y-5">
                        {/* Brand Search input inside Brands Card */}
                        <div className="relative flex items-center group">
                            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within:text-yellow-500 transition-colors" strokeWidth={2.5} />
                            <input 
                                type="text" 
                                placeholder={t('brandSearchPlaceholder')}
                                value={brandSearch}
                                onChange={(e) => onBrandSearchChange(e.target.value)}
                                className="w-full pl-[40px] pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-xl text-xs font-medium text-slate-800 dark:text-white outline-none focus:border-yellow-500/50 dark:focus:border-premium-gold/50 focus:bg-white dark:focus:bg-[#1a1a1c] transition-all placeholder:text-slate-400"
                            />
                        </div>

                        {/* Brands List */}
                        <div className="space-y-3.5">
                            {brandsOption.map(brand => {
                                const isSelected = selectedBrands.includes(brand.name);
                                return (
                                    <label key={brand.id} className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center space-x-3.5">
                                            <div className={`w-5 h-5 rounded-[6px] flex items-center justify-center border transition-all duration-300 ${isSelected ? 'bg-yellow-500 border-yellow-500 dark:bg-premium-gold dark:border-premium-gold shadow-sm shadow-yellow-500/30' : 'bg-white dark:bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-yellow-400 dark:group-hover:border-premium-gold/70'}`}>
                                                {isSelected && (
                                                    <svg className="w-3 h-3 text-white dark:text-[#0a0a0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className={`text-[13px] font-bold transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                                {brand.name}
                                            </span>
                                        </div>
                                        <span className="text-[11px] bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-bold">
                                            {brand.count < 10 ? `0${brand.count}` : brand.count}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}
            </FilterCard>

            {/* Price Range Card */}
            <FilterCard title={t('filters.priceRange')} isLoading={isLoading}>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-2 w-full rounded-full" />
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 pt-2">
                        {/* Custom Pure Tailwind Range Slider visual representation */}
                        <div className="relative w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full">
                            <div className="absolute left-[10%] right-[30%] h-full bg-yellow-500 dark:bg-premium-gold rounded-full shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
                            <div className="absolute left-[10%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-white dark:bg-[#141416] border-[3px] border-yellow-500 dark:border-premium-gold rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                            <div className="absolute right-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-white dark:bg-[#141416] border-[3px] border-yellow-500 dark:border-premium-gold rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-xl px-2 py-2.5 text-center text-xs font-bold text-slate-700 dark:text-slate-300">
                                2.000.000
                            </div>
                            <span className="text-slate-300 dark:text-slate-500 font-bold">-</span>
                            <div className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-xl px-2 py-2.5 text-center text-xs font-bold text-slate-700 dark:text-slate-300">
                                15.000.000
                            </div>
                        </div>
                    </div>
                )}
            </FilterCard>

            {/* Body Type Empty Mock Card */}
            <FilterCard title={t('filters.bodyType')} isLoading={isLoading}>
                {isLoading ? (
                    <div className="space-y-3">
                         <Skeleton className="h-10 w-full rounded-xl" />
                         <Skeleton className="h-5 w-2/3" />
                         <Skeleton className="h-5 w-3/4" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            disabled
                            placeholder="Gợi ý kiểu dáng..."
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl text-xs font-medium text-slate-400 outline-none cursor-not-allowed"
                        />
                        <div className="w-24 h-4 bg-slate-100 dark:bg-white/5 rounded-lg"></div>
                    </div>
                )}
            </FilterCard>

        </aside>
    );
};

export default SidebarFilter;
