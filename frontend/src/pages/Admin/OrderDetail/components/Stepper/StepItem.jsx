import React from 'react';
import { getStepStatus, getActiveColorClass } from './utils/stepperHelper';

export const StepItem = ({ item, index, orderStatus }) => {
    const { isCompleted, isCurrent } = getStepStatus(orderStatus, index);
    const activeColor = getActiveColorClass(index);

    const Icon = item.icon;

    return (
        <div className="relative flex flex-col items-center w-20 sm:w-24 z-10 group cursor-default">
            <div
                className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 relative
                    bg-white dark:bg-[#141416] /* Mask the background line */
                    ${isCurrent ? activeColor : ''}
                    ${isCompleted ? 'text-emerald-600 dark:text-emerald-500' : ''}
                    ${!isCurrent && !isCompleted ? 'text-slate-300 dark:text-slate-700' : ''}
                `}
            >
                <Icon
                    size={18}
                    strokeWidth={isCurrent || isCompleted ? 2.5 : 2}
                    className={isCurrent ? 'drop-shadow-sm' : ''}
                />
            </div>

            {/* Label */}
            <div
                className={`
                    mt-3 text-[10px] uppercase tracking-wider text-center transition-colors duration-500
                    ${isCurrent ? `${activeColor} font-bold` : ''}
                    ${isCompleted ? 'text-emerald-600 dark:text-emerald-500 font-bold' : ''}
                    ${!isCurrent && !isCompleted ? 'text-slate-400 dark:text-slate-600 font-medium' : ''}
                `}
            >
                {item.title}
            </div>

            {/* Clickable/Hoverable area (optional) */}
            <div className="absolute inset-0 -top-2 -bottom-2 -left-4 -right-4 bg-transparent z-20"></div>
        </div>
    );
};
