import React from 'react';
import { Check } from 'lucide-react';

export const KcsTaskItem = ({ task }) => {
    return (
        <label className={`flex items-center gap-4 cursor-not-allowed ${task.isCompleted ? 'opacity-70' : 'opacity-100'}`}>
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors
                ${task.isCompleted 
                    ? 'border-slate-900 bg-slate-900 dark:border-yellow-500 dark:bg-yellow-500/20' 
                    : 'border-slate-300 dark:border-slate-600 bg-transparent'
                }`}
            >
                {task.isCompleted && <Check size={14} className="text-white dark:text-yellow-500" strokeWidth={3} />}
            </div>
            <span className={`text-sm font-medium transition-colors ${task.isCompleted ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                {task.name}
            </span>
        </label>
    );
};
