import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route as RouteIcon, Check, Clock } from 'lucide-react';
import { formatTime } from '../../utils/formatters';

const ExecutionRoadmap = ({ progressData }) => {
    const { t } = useTranslation('adminRODetail');

    if (!progressData || !progressData.timeline_steps) return null;

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden">
            <h2 className="text-xs font-bold text-slate-500 dark:text-[#d3c5ac] mb-5 flex items-center gap-2 uppercase tracking-widest">
                <RouteIcon className="w-4 h-4" />
                {t('panel_roadmap_title', 'Lộ trình thi công')}
            </h2>

            <div className="flex flex-col gap-5 relative">
                <div className="absolute left-[11px] top-2 bottom-6 w-px bg-slate-200 dark:bg-slate-700 z-0"></div>

                {progressData.timeline_steps.map((step, index) => {
                    const isDone = step.status === 'done';
                    const isWarning = step.status === 'warning';
                    const isActive = step.status === 'active';
                    const isPending = step.status === 'pending';

                    const timeStr = step.started_at ? formatTime(step.started_at) : '--:--';

                    return (
                        <div key={step.id} className={`flex items-start gap-4 relative z-10 ${isPending ? 'opacity-50' : ''}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border 
                                ${isDone ? 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30' : ''}
                                ${isWarning ? 'bg-amber-100 dark:bg-amber-500/10 border-amber-400 ring-2 ring-white dark:ring-[#141416] ring-offset-1 dark:ring-offset-[#141416] animate-pulse' : ''}
                                ${isActive && !isWarning ? 'bg-blue-100 dark:bg-blue-500/10 border-blue-400 ring-2 ring-white dark:ring-[#141416] ring-offset-1 dark:ring-offset-[#141416]' : ''}
                                ${isPending ? 'bg-slate-100 dark:bg-[#23293c] border-slate-300 dark:border-slate-600' : ''}
                            `}>
                                {isDone && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                                {isWarning && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
                                {isActive && !isWarning && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                                {isPending && <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></div>}
                            </div>

                            <div className={`flex-1 min-w-0 ${isWarning ? 'bg-amber-50 dark:bg-[#1a1a1c] p-3 rounded-lg border border-amber-200 dark:border-amber-500/20 shadow-sm' : 'pt-0.5'}`}>
                                <div className="flex justify-between items-start gap-2 mb-1">
                                    <span className={`text-sm font-semibold uppercase tracking-wide truncate flex-1 min-w-0
                                        ${isWarning ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-700 dark:text-[#dce1fb]'}
                                    `} title={step.title}>
                                        {step.title}
                                    </span>
                                    <span className={`text-xs font-mono
                                        ${isWarning ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-[#d3c5ac]'}
                                    `}>
                                        {timeStr}
                                    </span>
                                </div>
                                {isWarning && (
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30">
                                        <Clock className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                                        <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                                            {t('status_WAITING_FOR_APPROVAL', 'Chờ phê duyệt')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExecutionRoadmap;
