import React from 'react';
import { useTranslation } from 'react-i18next';
import { GANTT_CONSTANTS } from '../../../../constants/ganttConstants';

const GanttHeader = () => {
    const { t } = useTranslation('adminServiceReception');

    return (
        <div className="flex bg-slate-100 dark:bg-[#141416] border-b border-slate-200 dark:border-white/10 sticky top-0 z-30">
            <div className="w-80 shrink-0 p-4 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0b] shadow-[4px_0_10px_rgba(0,0,0,0.05)]"></div>

            <div className="flex-1 flex text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                {GANTT_CONSTANTS.HOURS.map((hour) => (
                    <div key={hour} className="flex-1 py-3 px-3 border-l border-slate-200 dark:border-white/5 text-center relative">
                        <span className="absolute left-0 -translate-x-1/2 bg-slate-100 dark:bg-[#141416] px-1 z-10">
                            {t(`time_${hour}`, `${hour.substring(0, 2)}:${hour.substring(2)}`)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GanttHeader;
