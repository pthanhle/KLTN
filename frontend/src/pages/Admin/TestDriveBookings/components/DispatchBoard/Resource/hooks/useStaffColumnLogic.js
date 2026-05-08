import { useDroppable } from '@dnd-kit/core';
import dayjs from 'dayjs';
import { getWorkloadTheme } from '../../../../utils/dispatch.utils';

export const useStaffColumnLogic = (staff, filterDate) => {
    const { isOver, setNodeRef } = useDroppable({
        id: staff._id,
        data: {
            type: 'StaffColumn',
            staff
        }
    });

    const todoTasks = staff.performance?.kanban?.todo || [];
    const inProgressTasks = staff.performance?.kanban?.inProgress || [];
    const allTasks = [...inProgressTasks, ...todoTasks];

    const currentTasks = allTasks.filter(task => {
        if (!filterDate) return true;

        const filterDateString = filterDate.format('DD/MM/YYYY');
        const taskDate = task.appointmentDate;

        if (!taskDate || taskDate === 'Hôm nay' || taskDate === 'Today') {
            return filterDateString === dayjs().format('DD/MM/YYYY');
        }

        return taskDate === filterDateString;
    });

    const workloadCount = currentTasks.length;
    const workloadColor = getWorkloadTheme(workloadCount);

    return {
        isOver,
        setNodeRef,
        currentTasks,
        workloadCount,
        workloadColor
    };
};
