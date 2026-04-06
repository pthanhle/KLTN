import React from 'react';
import { Edit3 } from 'lucide-react';

export const EditAction = ({ onEdit, tooltipText = 'Chỉnh sửa' }) => {
    return (
        <button 
            type="button"
            onClick={onEdit}
            title={tooltipText}
            className="group w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-yellow-50/50 dark:bg-yellow-500/10 border border-yellow-200/50 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white dark:hover:bg-yellow-500 dark:hover:text-[#141416] transition-all shadow-sm outline-none"
        >
            <Edit3 size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
        </button>
    );
};
