import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KanbanColumn } from './components/KanbanColumn';
import { TaskDetailModal } from './components/TaskDetailModal';
import { ChatAuditModal } from './components/ChatAuditModal';
import { KANBAN_STATUS, getKanbanColumnKeys } from '../../constants/performanceConstants';

export const WorkloadKanban = ({ kanbanData, role, staffName }) => {
    const { t } = useTranslation();
    const [selectedTask, setSelectedTask] = useState(null);

    if (!kanbanData) return null;

    const columnKeys = getKanbanColumnKeys(role);

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white mb-8">
                {t('adminStaffDetail:perf_kanban_title')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <KanbanColumn 
                    title={t(`adminStaffDetail:${columnKeys.todo}`)} 
                    count={kanbanData.todo?.length || 0} 
                    tasks={kanbanData.todo?.map(task => ({ ...task, onClick: () => setSelectedTask(task) }))} 
                    status={KANBAN_STATUS.TODO} 
                />
                
                <KanbanColumn 
                    title={t(`adminStaffDetail:${columnKeys.inProgress}`)} 
                    count={kanbanData.inProgress?.length || 0} 
                    tasks={kanbanData.inProgress?.map(task => ({ ...task, onClick: () => setSelectedTask(task) }))} 
                    status={KANBAN_STATUS.IN_PROGRESS} 
                    isPulse={true}
                />
                
                <KanbanColumn 
                    title={t(`adminStaffDetail:${columnKeys.done}`)} 
                    count={kanbanData.done?.length || 0} 
                    tasks={kanbanData.done?.map(task => ({ ...task, onClick: () => setSelectedTask(task) }))} 
                    status={KANBAN_STATUS.DONE} 
                />
            </div>

            {selectedTask && selectedTask.taskType === 'CHAT' ? (
                <ChatAuditModal 
                    task={selectedTask} 
                    staffName={staffName}
                    onClose={() => setSelectedTask(null)} 
                />
            ) : selectedTask ? (
                <TaskDetailModal 
                    task={selectedTask} 
                    onClose={() => setSelectedTask(null)} 
                />
            ) : null}
        </div>
    );
};
