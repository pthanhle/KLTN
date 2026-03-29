import { mockQuickActions } from '../../../data/chatbot.mock';

const QuickActions = ({ t, onActionClick }) => {
    return (
        <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar px-6">
            {mockQuickActions.map((action) => (
                <button 
                    key={action.id}
                    onClick={() => onActionClick(t(action.labelKey))}
                    className="flex-shrink-0 px-4 py-2 rounded-full bg-slate-100 dark:bg-[#161d2d] text-[11px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-yellow-500/50 hover:text-yellow-600 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-all active:scale-95 shadow-sm"
                >
                    {t(action.labelKey)}
                </button>
            ))}
        </div>
    );
};
export default QuickActions;
