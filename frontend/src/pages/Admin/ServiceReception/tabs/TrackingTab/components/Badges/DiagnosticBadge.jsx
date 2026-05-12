import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { DIAGNOSTIC_STATUSES } from '../../constants/trackingConstants';

const DiagnosticBadge = ({ status, t }) => {
    if (status === DIAGNOSTIC_STATUSES.CRITICAL) {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 dark:border-rose-500/30 text-xs font-bold uppercase tracking-[0.1em]">
                <AlertTriangle size={14} /> {t('tracking_diag_critical', 'Critical')}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 text-xs font-bold uppercase tracking-[0.1em]">
            <CheckCircle2 size={14} /> {t('tracking_diag_healthy', 'Healthy')}
        </span>
    );
};

export default DiagnosticBadge;
