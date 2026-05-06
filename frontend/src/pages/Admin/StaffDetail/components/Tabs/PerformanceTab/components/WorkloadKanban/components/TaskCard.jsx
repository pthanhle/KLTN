import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Clock, User, Car, Hash } from 'lucide-react';
import { KANBAN_STATUS } from '../../../constants/performanceConstants';
import { getPriorityStyles } from '../../../utils/performanceUtils';

export const TaskCard = ({ task, status }) => {
    const { t } = useTranslation();

    const pStyles = getPriorityStyles(task.priority);
    const translatedPriority = task.priority ? t(`adminStaffDetail:perf_kanban_priority_${task.priority.toLowerCase()}`) : task.priority;

    const isChat = task.taskType === 'CHAT';
    const blinkingClass = task.isBlinking ? 'animate-pulse ring-2 ring-yellow-500/50 border-yellow-500/50' : '';

    return (
        <div
            onClick={task.onClick}
            className={`group flex flex-col bg-white dark:bg-[#1c1c1e] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 relative overflow-hidden ${blinkingClass}`}
        >
            <div className="flex justify-between items-start p-4 pb-2">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {task.id}
                    </span>
                    {isChat && (
                        <div className="bg-yellow-500/10 text-yellow-500 p-1 rounded-md">
                            <MessageCircle size={12} className="fill-yellow-500/20" />
                        </div>
                    )}
                </div>
                {task.priority && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${pStyles}`}>
                        {translatedPriority}
                    </span>
                )}
            </div>

            <div className="px-4 pb-4 flex-1 flex flex-col gap-3">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-snug line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                    {task.title}
                </h4>

                {(task.vehicleModel || task.licensePlate) && (
                    <div className="flex flex-wrap items-center gap-2">
                        {task.licensePlate && (
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200 dark:border-white/5">
                                <Hash size={10} className="text-slate-400" />
                                <span className="text-xs font-mono font-bold text-slate-700 dark:text-gray-300 uppercase">
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
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300 max-w-[60%]">
                    <User size={12} className="flex-shrink-0 text-slate-400" />
                    <span className="text-xs font-medium truncate">
                        {task.customerName || t('adminStaffDetail:modal_not_available')}
                    </span>
                </div>

                {status === KANBAN_STATUS.DONE && task.billed ? (
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-none mb-1">
                            {t('adminStaffDetail:perf_kanban_billed')}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 leading-none">
                            {task.billed}
                        </span>
                    </div>
                ) : task.sla && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={12} className={status !== KANBAN_STATUS.DONE && task.priority === 'HIGH' ? 'text-red-500' : ''} />
                        <span className={`text-xs font-bold ${status !== KANBAN_STATUS.DONE && task.priority === 'HIGH' ? 'text-red-500' : 'text-slate-700 dark:text-white'}`}>
                            {task.sla}
                        </span>
                    </div>
                )}
            </div>

            {status === KANBAN_STATUS.IN_PROGRESS && task.progress !== undefined && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-100 dark:bg-white/5">
                    <div
                        className={`h-full transition-all duration-500 ${task.progress >= 80 ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                        style={{ width: `${task.progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};
