import HistoryCard from './HistoryCard';
import { useTranslation } from 'react-i18next';

const RecentHistory = ({ history }) => {
    const { t } = useTranslation('layout');
    if (!history || history.length === 0) return null;

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
                    
                    {history.map((item) => (
                        <HistoryCard key={item.id} history={item} />
                    ))}
                    
                </div>
            </div>
        </section>
    );
};

export default RecentHistory;
