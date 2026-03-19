import HistoryCard from '../Cards/HistoryCard';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';

const RecentHistory = ({ history, isLoading, onCarClick }) => {
    const { t } = useTranslation('layout');
    if (!isLoading && (!history || history.length === 0)) return null;

    return (
        <section className="py-12 bg-white dark:bg-[#0a0a0b] transition-colors duration-300 border-t border-slate-100 dark:border-white/5">
            <div className="container mx-auto px-6 lg:px-10">
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                            {t('customer.home.recentHistory.title')}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                            {t('customer.home.recentHistory.subtitle')}
                        </p>
                    </div>
                    <button className="text-xs font-bold text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 hover:underline underline-offset-4 transition-all uppercase tracking-wider">
                        {t('customer.home.recentHistory.viewAllBtn')}
                    </button>
                </div>

                {/* Horizontal Scrollable container */}
                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 
                    [&::-webkit-scrollbar]:h-[4px] 
                    [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-[#141416] 
                    [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-yellow-500">
                    
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] flex flex-col gap-3">
                                <Skeleton className="h-[180px] w-full rounded-lg" />
                                <Skeleton className="h-4 w-[200px]" />
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-[120px]" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            </div>
                        ))
                        : history.map((item) => (
                            <HistoryCard key={item.id} history={item} onClick={() => onCarClick(item.id)} />
                        ))}
                    
                </div>
            </div>
        </section>
    );
};

export default RecentHistory;
