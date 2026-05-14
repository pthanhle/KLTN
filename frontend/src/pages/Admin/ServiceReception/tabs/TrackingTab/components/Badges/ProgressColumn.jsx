import React from 'react';

const ProgressColumn = ({ progress }) => {
    // Determine color based on progress
    let colorClass = 'bg-slate-400 dark:bg-slate-500';
    let textColorClass = 'text-slate-500 dark:text-slate-400';
    
    if (progress >= 100) {
        colorClass = 'bg-purple-500';
        textColorClass = 'text-purple-600 dark:text-purple-400';
    } else if (progress >= 60) {
        colorClass = 'bg-emerald-500';
        textColorClass = 'text-emerald-600 dark:text-emerald-400';
    } else if (progress >= 25) {
        colorClass = 'bg-amber-500';
        textColorClass = 'text-amber-600 dark:text-amber-400';
    }

    return (
        <div className="flex items-center gap-3 w-full max-w-[200px]">
            <div className="flex-1 h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ${colorClass}`} 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <span className={`text-xs font-bold ${textColorClass}`}>
                {progress}%
            </span>
        </div>
    );
};

export default ProgressColumn;
