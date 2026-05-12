import React from 'react';
import { QUOTATION_STATUSES } from '../../constants/trackingConstants';

const QuotationBadge = ({ status, t }) => {
    switch (status) {
        case QUOTATION_STATUSES.WAITING_FOR_APPROVAL:
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30 text-xs font-bold uppercase tracking-[0.1em] animate-pulse">
                    {t('tracking_quote_waiting', 'WAITING_FOR_APPROVAL')}
                </span>
            );
        case QUOTATION_STATUSES.REJECTED:
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 dark:border-rose-500/30 text-xs font-bold uppercase tracking-[0.1em]">
                    {t('tracking_quote_rejected', 'REJECTED')}
                </span>
            );
        case QUOTATION_STATUSES.APPROVED:
        default:
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 text-xs font-bold uppercase tracking-[0.1em]">
                    {t('tracking_quote_approved', 'APPROVED')}
                </span>
            );
    }
};

export default QuotationBadge;
