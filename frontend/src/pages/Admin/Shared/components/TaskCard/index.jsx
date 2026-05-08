import React from 'react';
import { MessageCircle, Clock, User, Car, Hash } from 'lucide-react';
import { useTaskCardLogic } from './hooks/useTaskCardLogic';

const TaskCard = ({ task, status, onClick }) => {
    const {
        pStyles,
        priorityLabel,
        isChat,
        blinkingClass,
        isDoneWithBilled,
        displayDate,
        displayTime,
        displayCustomerName,
        slaStyle,
        t
    } = useTaskCardLogic(task, status);

    const handleClick = () => {
        if (onClick) onClick(task);
        else if (task.onClick) task.onClick();
    };

    return (
        <article
            onClick={handleClick}
            className={`group flex flex-col shrink-0 bg-white dark:bg-[#1c1c1e] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md hover:border-yellow-500/50 dark:hover:border-yellow-500/50 cursor-pointer transition-all duration-300 relative overflow-hidden ${blinkingClass}`}
        >
            <div className="flex justify-between items-start p-4 pb-2">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md uppercase tracking-wider border border-slate-200 dark:border-white/5">
                        {task.id}
                    </span>
                    {isChat && (
                        <div className="bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
                            <MessageCircle size={12} className="fill-yellow-500/20" />
                        </div>
                    )}
                </div>
                {task.priority && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${pStyles}`}>
                        {priorityLabel}
                    </span>
                )}
            </div>

            <div className="px-4 pb-3 flex-1 flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-snug line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                    {task.title}
                </h4>

                {(task.vehicleModel || task.licensePlate) && (
                    <div className="flex flex-wrap items-center gap-2">
                        {task.licensePlate && (
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded-md border border-slate-200 dark:border-white/5">
                                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-gray-300 uppercase">
                                    {task.licensePlate}
                                </span>
                            </div>
                        )}
                        {task.vehicleModel && (
                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400">
                                <Car size={12} />
                                <span className="text-xs font-medium line-clamp-1">
                                    {task.vehicleModel}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex justify-between items-center mt-auto">
                <div className="flex flex-col gap-1 max-w-[65%]">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                        <User size={12} className="flex-shrink-0 text-slate-400" />
                        <span className="text-xs font-medium truncate">
                            {displayCustomerName}
                            {task.customerPhone && <span className="ml-1 opacity-70 font-normal">({task.customerPhone})</span>}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Clock size={12} className="flex-shrink-0 text-slate-400" />
                        <time className="text-[10px] font-medium truncate">
                            {displayDate} • {displayTime}
                        </time>
                    </div>
                </div>

                {isDoneWithBilled ? (
                    <div className="flex flex-col items-end shrink-0">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-none mb-1">
                            {t('adminStaffDetail:perf_kanban_billed', 'Đã tính phí')}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 leading-none">
                            {task.billed}
                        </span>
                    </div>
                ) : task.sla && (
                    <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-white/5 px-2 py-0.5 rounded border border-slate-200 dark:border-white/5 ${slaStyle}`}>
                            SLA: {task.sla}
                        </span>
                    </div>
                )}
            </div>

            {task.progress !== undefined && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-100 dark:bg-white/5">
                    <div
                        className={`h-full transition-all duration-500 ${task.progress >= 80 ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                        style={{ width: `${task.progress}%` }}
                    />
                </div>
            )}
        </article>
    );
};

export default TaskCard;
