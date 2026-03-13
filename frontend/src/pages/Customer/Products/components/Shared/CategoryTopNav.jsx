import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import * as Icons from 'lucide-react';

const CategoryTopNav = ({ isLoading, categoriesList, activeCategory, onCategoryChange }) => {
    const { t } = useTranslation('products');

    return (
        <div className="w-full bg-white dark:bg-[#141416] py-4 border-b border-slate-100 dark:border-white/5 shadow-sm sticky top-20 z-40">
            <div className="container mx-auto px-6 lg:px-10">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-2 pt-2 
                    [&::-webkit-scrollbar]:h-[4px] 
                    [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-[#141416] 
                    [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-yellow-500">
                    
                    {isLoading ? (
                        Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                                <Skeleton className="h-14 w-14 rounded-2xl" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        ))
                    ) : (
                        categoriesList.map((cat) => {
                            const IconComponent = Icons[cat.icon] || Icons.Car;
                            const isActive = activeCategory === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => onCategoryChange(cat.id)}
                                    className={`flex flex-col items-center gap-3 min-w-[72px] group transition-all duration-300 ${
                                        isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                        isActive 
                                            ? 'bg-yellow-500 text-white dark:bg-premium-gold dark:text-[#0a0a0b] shadow-md shadow-yellow-500/20 dark:shadow-premium-gold/20' 
                                            : 'bg-slate-50 text-slate-500 dark:bg-white/5 dark:text-slate-400 group-hover:bg-slate-100 dark:group-hover:bg-white/10'
                                    }`}>
                                        <IconComponent size={24} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <span className={`text-[10px] sm:text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-colors ${
                                        isActive ? 'text-yellow-600 dark:text-premium-gold' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                                    }`}>
                                        {t(`categories.${cat.id}`)}
                                    </span>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryTopNav;
