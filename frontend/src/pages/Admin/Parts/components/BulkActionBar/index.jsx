import React from 'react';
import { EyeOff, Trash2 } from 'lucide-react';

const BulkActionBar = ({ selectedCount, onHideBulk, onDeleteBulk, t }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="px-8 py-4 mb-6 rounded-2xl bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 flex justify-between items-center animate-in slide-in-from-top-2 shadow-lg shadow-yellow-500/5">
            <span className="text-yellow-700 dark:text-yellow-500 font-bold text-sm">
                {t('adminParts:bulkSelected', { count: selectedCount })}
            </span>
            <div className="flex gap-3">
                <button 
                    onClick={onHideBulk}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-[#23293c] text-slate-700 dark:text-white rounded-xl text-xs font-bold hover:bg-slate-300 dark:hover:bg-[#2e3447] transition-colors"
                >
                    <EyeOff size={14} /> {t('adminParts:btnHideBulk')}
                </button>
                <button 
                    onClick={onDeleteBulk}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors"
                >
                    <Trash2 size={14} /> {t('adminParts:btnDeleteBulk')}
                </button>
            </div>
        </div>
    );
};

export default BulkActionBar;
