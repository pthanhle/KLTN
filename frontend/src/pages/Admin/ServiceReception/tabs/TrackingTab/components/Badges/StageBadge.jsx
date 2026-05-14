import React from 'react';
import { TRACKING_STAGES } from '../../constants/trackingConstants';

const StageBadge = ({ stage, t }) => {
    let colorClass = 'bg-slate-500';
    let label = t('stage_unknown', 'Không rõ');
    let animate = false;

    switch (stage) {
        case TRACKING_STAGES.DIAGNOSIS:
            colorClass = 'bg-slate-500';
            label = t('stage_diagnosis', 'Chẩn đoán');
            break;
        case TRACKING_STAGES.QUOTATION:
            colorClass = 'bg-amber-500';
            label = t('stage_quotation', 'Báo giá');
            break;
        case TRACKING_STAGES.EXECUTION:
            colorClass = 'bg-emerald-500';
            label = t('stage_execution', 'Thi công');
            animate = true;
            break;
        case TRACKING_STAGES.QC:
            colorClass = 'bg-blue-500';
            label = t('stage_qc', 'Kiểm định');
            animate = true;
            break;
        case TRACKING_STAGES.DELIVERY:
            colorClass = 'bg-purple-500';
            label = t('stage_delivery', 'Bàn giao');
            break;
        default:
            break;
    }

    return (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#1c1c1e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-medium text-xs uppercase tracking-[0.1em]">
            <span className={`w-2 h-2 rounded-full ${colorClass} ${animate ? 'animate-pulse' : ''}`}></span>
            {label}
        </span>
    );
};

export default StageBadge;
