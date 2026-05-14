import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

export const QueueItem = ({
    id,
    plateText,
    customerNameText,
    isReadyForHandover,
    statusText,
    paymentBadgeText,
    isPaid,
    isSelected,
    onClick
}) => {
    return (
        <article 
            onClick={() => onClick(id)}
            className={`rounded-lg p-4 cursor-pointer transition-all duration-200 shadow-sm
                ${isSelected 
                    ? 'bg-slate-50 dark:bg-slate-800 border-2 border-slate-900 dark:border-yellow-500' 
                    : 'bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30'
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <span className={`font-mono font-bold text-lg ${isSelected ? 'text-slate-900 dark:text-yellow-500' : 'text-slate-800 dark:text-white'}`}>
                    {plateText}
                </span>
                
                <span className={`text-[10px] px-2 py-1 rounded-md uppercase tracking-wider font-bold
                    ${isPaid 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                >
                    {paymentBadgeText}
                </span>
            </div>
            
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {customerNameText}
            </div>
            
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-3 flex items-center gap-1.5">
                {isReadyForHandover ? (
                    <CheckCircle size={14} className="text-emerald-500" /> 
                ) : (
                    <Clock size={14} /> 
                )}
                <span>{statusText}</span>
            </div>
        </article>
    );
};
