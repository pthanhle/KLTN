import React from 'react';
import { Tooltip } from 'antd';
import { Trash2 } from 'lucide-react';

export const DeleteLockedAction = ({ tooltipTitle }) => {
    return (
        <Tooltip title={tooltipTitle} color="#ef4444">
            <button 
                type="button"
                className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 opacity-50 cursor-not-allowed"
            >
                <Trash2 size={16} strokeWidth={2.5} />
            </button>
        </Tooltip>
    );
};
