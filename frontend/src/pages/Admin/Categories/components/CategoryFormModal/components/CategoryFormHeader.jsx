import { Layers, X } from 'lucide-react';

export const CategoryFormHeader = ({ isEditing, onClose, t }) => {
    return (
        <header className="px-8 py-6 flex items-center justify-between border-b border-transparent dark:border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                    <Layers size={20} strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                    {isEditing ? t('adminCategories:editTitle') : t('adminCategories:createTitle')}
                </h2>
            </div>
            <button 
                type="button" 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white transition-colors outline-none"
            >
                <X size={20} strokeWidth={2.5} />
            </button>
        </header>
    );
};
