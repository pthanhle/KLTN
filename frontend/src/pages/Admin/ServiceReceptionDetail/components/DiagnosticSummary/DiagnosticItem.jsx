import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

const DiagnosticItem = ({ item }) => {
    const { t } = useTranslation('adminRODetail');

    const isCritical = item.status === 'critical';
    const isWarning = item.status === 'warning';
    const isNormal = item.status === 'normal';

    return (
        <div className={`p-3 rounded border text-sm flex flex-col gap-1.5
            ${isCritical ? 'bg-rose-50/50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-500/20' : ''}
            ${isWarning ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20' : ''}
            ${isNormal ? 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-100 dark:border-white/5' : ''}
        `}>
            <div className="flex items-center gap-2">
                {isCritical && <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />}
                {isWarning && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                {isNormal && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                <span className={`font-semibold ${!isNormal ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {item.name}
                </span>
            </div>
            
            {!isNormal && item.action_required && (
                <div className="pl-6">
                    <span className={`text-[11px] font-medium leading-tight
                        ${isCritical ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}
                    `}>
                        <span className="uppercase tracking-wider opacity-70 mr-1">
                            {isCritical ? t('diag_action_critical', 'Chẩn đoán:') : t('diag_action_warning', 'Ghi chú:')}
                        </span> 
                        {item.action_required}
                    </span>
                </div>
            )}
        </div>
    );
};

export default DiagnosticItem;
