import React from 'react';
import { STATUS_STYLES, STATUS_DOT_STYLES } from '../../constants/attendanceConstants';

const StatusBadge = ({ status, t }) => {
    if (!status) return null;

    const styleClass = STATUS_STYLES[status] || STATUS_STYLES.DAY_OFF;
    const dotClass = STATUS_DOT_STYLES[status] || STATUS_DOT_STYLES.DAY_OFF;
    const translatedLabel = t(`adminStaffAttendance:status_${status.toLowerCase()}`, status);

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${styleClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
            {translatedLabel}
        </span>
    );
};

export default StatusBadge;
