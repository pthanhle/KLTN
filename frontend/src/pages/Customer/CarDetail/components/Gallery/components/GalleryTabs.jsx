import { motion } from 'framer-motion';

export const GalleryTabs = ({ activeTab, onTabChange, t }) => {
    return (
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-[#141416] rounded-full border border-slate-200 dark:border-white/5 relative transition-colors">
            <button
                onClick={() => onTabChange('photos')}
                className={`relative px-6 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all z-10 ${activeTab === 'photos' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
                {t('products:detail.photos')}
            </button>
            <button
                onClick={() => onTabChange('videos')}
                className={`relative px-6 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all z-10 ${activeTab === 'videos' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
                {t('products:detail.videos')}
            </button>

            <motion.div
                className="absolute inset-y-1 w-[50%] bg-white dark:bg-[#202022] shadow-sm dark:shadow-none rounded-full z-0 pointer-events-none border border-slate-200 dark:border-white/5 transition-colors"
                initial={false}
                animate={{
                    left: activeTab === 'photos' ? '6px' : 'calc(50% + 2px)',
                    width: 'calc(50% - 8px)'
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        </div>
    );
};
