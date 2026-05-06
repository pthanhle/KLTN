import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskCard } from './TaskCard';
import { KANBAN_STATUS } from '../../../constants/performanceConstants';

export const KanbanColumn = ({ title, count, tasks, status, isPulse }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50/50 dark:bg-[#141416]/50 backdrop-blur-md rounded-xl p-4 border border-slate-200 dark:border-white/5 min-h-[500px] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10 px-2">
                <h4 className={`font-medium uppercase tracking-widest text-sm font-bold flex items-center gap-2 ${isPulse ? 'text-yellow-600 dark:text-yellow-500' : (status === KANBAN_STATUS.DONE ? 'text-slate-500 dark:text-gray-500' : 'text-slate-800 dark:text-white')}`}>
                    {isPulse && <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>}
                    {title}
                </h4>
                <span className="bg-slate-200 dark:bg-[#2e3447] text-slate-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md">
                    {count}
                </span>
            </div>
            
            <div className={`flex flex-col flex-1 gap-3 ${status === KANBAN_STATUS.DONE ? 'opacity-70 hover:opacity-100 transition-opacity' : ''}`}>
                {tasks?.map(task => (
                    <TaskCard key={task.id} task={task} status={status} />
                ))}
                
                {(!tasks || tasks.length === 0) && (
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-lg">
                        <span className="text-slate-400 dark:text-gray-600 text-sm italic">{t('adminStaffDetail:perf_no_tasks')}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
