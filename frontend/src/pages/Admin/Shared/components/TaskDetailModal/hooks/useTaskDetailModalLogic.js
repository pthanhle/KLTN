import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSharedPriorityStyles } from '../../../../Shared/utils/task.utils';
import { TASK_PRIORITY } from '../../../../Shared/constants/task.constants';
import { useLockBodyScroll } from '../../../../StaffDetail/components/Tabs/PerformanceTab/hooks/useLockBodyScroll'; // Wait, I should probably copy useLockBodyScroll to Shared/hooks or adjust path.

export const useTaskDetailModalLogic = (task, onClose) => {
    const { t } = useTranslation(['adminStaffDetail', 'adminTestDriveBookings']);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 200);
    };

    if (!task) return { isReady: false };

    const pStyles = getSharedPriorityStyles(task.priority);

    const translatedPriority = task.priority ? t(`adminStaffDetail:perf_kanban_priority_${task.priority.toLowerCase()}`, task.priority) : task.priority;

    return {
        isReady: true,
        isClosing,
        handleClose,
        pStyles,
        translatedPriority,
        t,
        isHighPriority: task.priority === TASK_PRIORITY.HIGH || task.priority === TASK_PRIORITY.URGENT
    };
};
