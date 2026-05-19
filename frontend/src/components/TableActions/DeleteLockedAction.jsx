import React from 'react';
import { Tooltip } from 'antd';
import { Trash2 } from 'lucide-react';

export const DeleteLockedAction = ({ tooltipTitle }) => {
    return (
        <Tooltip 
            title={<span className="font-bold text-[12px] tracking-wide">{tooltipTitle}</span>} 
            color="#ef4444"
            placement="topRight"
            overlayClassName="[&_.ant-tooltip-inner]:!rounded-xl [&_.ant-tooltip-inner]:!px-4 [&_.ant-tooltip-inner]:!py-2 shadow-xl shadow-red-500/20"
        >
            <button 
                type="button"
                className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 opacity-50 cursor-not-allowed"
            >
                <Trash2 size={16} strokeWidth={2.5} />
            </button>
        </Tooltip>
    );
};
