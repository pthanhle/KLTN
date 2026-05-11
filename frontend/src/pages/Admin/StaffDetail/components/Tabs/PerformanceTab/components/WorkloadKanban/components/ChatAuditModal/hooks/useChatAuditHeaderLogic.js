import { useTranslation } from 'react-i18next';
import { formatTaskSla } from '../../../../../../../../../Shared/utils/task.utils';

export const useChatAuditHeaderLogic = (task) => {
    const { t } = useTranslation();

    const displaySla = formatTaskSla(task?.sla, t);

    return {
        t,
        displaySla
    };
};
