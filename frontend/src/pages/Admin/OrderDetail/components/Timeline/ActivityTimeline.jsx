import React from 'react';
import { useTranslation } from 'react-i18next';
import { History, UserCircle2 } from 'lucide-react';
import { ORDER_STATUSES } from '../../../Orders/constants/statusConfig';

export const ActivityTimeline = ({ logs }) => {
    const { t } = useTranslation('adminOrderDetail');

    if (!logs || logs.length === 0) return null;

    const sortedLogs = [...logs].reverse();

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5 h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac] flex items-center gap-2">
                    <History size={16} /> {t('activity_log_title')}
                </h2>
            </div>

            <div className="relative pl-3">
                {/* Vertical Line */}
                <div className="absolute top-3 bottom-3 left-[15px] w-0.5 bg-slate-100 dark:bg-white/5"></div>

                <div className="space-y-6">
                    {sortedLogs.map((log, index) => {
                        const statusConfig = ORDER_STATUSES[log.status];

                        return (
                            <div key={index} className="relative flex items-start gap-4">
                                {/* Timeline Dot */}
                                <div className={`relative z-10 w-3 h-3 rounded-full mt-1.5 shrink-0 shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#141416]
                                    ${statusConfig?.bg ? statusConfig.bg.split(' ')[0] : 'bg-slate-200'} 
                                    ${statusConfig?.border ? statusConfig.border.split(' ')[0] : 'border-slate-300'} border-2
                                `}></div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            {t(`status_${log.status?.toLowerCase()}`, log.status)}
                                        </p>
                                        <span className="text-xs font-medium text-slate-400">
                                            {log.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {log.note}
                                    </p>
                                    {log.actor && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <UserCircle2 size={12} className="text-slate-400" />
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                                                {log.actor === 'System' ? t('actor_system', 'Hệ thống') : log.actor}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
