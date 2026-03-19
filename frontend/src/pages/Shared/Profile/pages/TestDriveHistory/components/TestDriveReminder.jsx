import { Info, ArrowRight } from 'lucide-react';

const TestDriveReminder = ({ t }) => {
    return (
        <div className="mt-12 p-6 md:p-8 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300 shadow-sm">
            <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 dark:bg-yellow-500/20 flex items-center justify-center shrink-0">
                    <Info size={18} className="text-yellow-600 dark:text-yellow-500" />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {t('arrival_reminder', 'Please arrive 15 minutes before your scheduled test drive with a valid driver\'s license.')}
                </p>
            </div>
            
            <button className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors group">
                {t('view_terms', 'View General Terms')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default TestDriveReminder;
