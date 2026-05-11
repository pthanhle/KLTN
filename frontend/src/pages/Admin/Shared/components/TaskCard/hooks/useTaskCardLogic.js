import { useTranslation } from 'react-i18next';
import { getSharedPriorityStyles, formatTaskSla } from '../../../../Shared/utils/task.utils';

export const useTaskCardLogic = (task, status) => {
    const { t } = useTranslation(['adminStaffDetail', 'adminTestDriveBookings']);

    const pStyles = getSharedPriorityStyles(task.priority);

    const getPriorityLabel = () => {
        if (!task.priority) return '';
        return t(`adminTestDriveBookings:priority_${task.priority.toLowerCase()}`,
            t(`adminStaffDetail:perf_kanban_priority_${task.priority.toLowerCase()}`, task.priority));
    };

    const isChat = task.taskType === 'CHAT';

    const isOverdue = status !== 'DONE' && (task.priority === 'HIGH' || task.priority === 'URGENT');
    const isDoneWithBilled = status === 'DONE' && task.billed;

    const blinkingClass = task.isBlinking ? 'animate-pulse ring-2 ring-yellow-500/50 border-yellow-500/50' : '';

    const displayDate = task.appointmentDate || t('adminStaffDetail:date_today', 'Hôm nay');
    const displayTime = task.appointmentTime || t('adminStaffDetail:modal_not_available', 'N/A');
    const displayCustomerName = task.customerName || t('adminStaffDetail:modal_not_available', 'N/A');

    const displaySla = formatTaskSla(task.sla, t);

    const slaStyle = isOverdue ? 'text-rose-500 dark:text-rose-500' : 'text-slate-700 dark:text-slate-300';

    return {
        pStyles,
        priorityLabel: getPriorityLabel(),
        isChat,
        blinkingClass,
        isDoneWithBilled,
        displayDate,
        displayTime,
        displayCustomerName,
        displaySla,
        slaStyle,
        t
    };
};
