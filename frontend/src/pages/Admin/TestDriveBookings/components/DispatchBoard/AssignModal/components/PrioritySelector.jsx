import React from 'react';
import { TASK_PRIORITIES } from '../../../../constants/dispatch.constants';

const PrioritySelector = ({ value, onChange, t }) => {
    const options = [
        { value: TASK_PRIORITIES.URGENT, label: t('adminTestDriveBookings:priority_urgent', 'Khẩn cấp'), activeClass: 'bg-rose-50 border-rose-500 text-rose-600 dark:bg-rose-500/20 dark:border-rose-500 dark:text-rose-400', idleClass: 'bg-white border-slate-200 text-slate-600 dark:bg-[#141416] dark:border-white/10 dark:text-slate-400' },
        { value: TASK_PRIORITIES.HIGH, label: t('adminTestDriveBookings:priority_high', 'Cao'), activeClass: 'bg-orange-50 border-orange-500 text-orange-600 dark:bg-orange-500/20 dark:border-orange-500 dark:text-orange-400', idleClass: 'bg-white border-slate-200 text-slate-600 dark:bg-[#141416] dark:border-white/10 dark:text-slate-400' },
        { value: TASK_PRIORITIES.MEDIUM, label: t('adminTestDriveBookings:priority_medium', 'Trung bình'), activeClass: 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500 dark:text-blue-400', idleClass: 'bg-white border-slate-200 text-slate-600 dark:bg-[#141416] dark:border-white/10 dark:text-slate-400' },
        { value: TASK_PRIORITIES.LOW, label: t('adminTestDriveBookings:priority_low', 'Thấp'), activeClass: 'bg-slate-100 border-slate-500 text-slate-700 dark:bg-slate-700/50 dark:border-slate-500 dark:text-slate-300', idleClass: 'bg-white border-slate-200 text-slate-600 dark:bg-[#141416] dark:border-white/10 dark:text-slate-400' }
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {options.map(opt => {
                const isActive = value === opt.value;
                return (
                    <div
                        key={opt.value}
                        onClick={() => onChange(opt.value)}
                        className={`px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center font-bold text-sm shadow-sm
                            ${isActive ? opt.activeClass : opt.idleClass + ' hover:border-slate-300 dark:hover:border-white/20'}`}
                    >
                        {opt.label}
                    </div>
                );
            })}
        </div>
    );
};

export default PrioritySelector;
