import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';

export const DateFilter = ({ value, onChange }) => {
    const { t } = useTranslation();

    const options = [
        { value: 'this_month', label: t('adminStaffDetail:filter_this_month', 'Tháng này') },
        { value: 'last_month', label: t('adminStaffDetail:filter_last_month', 'Tháng trước') },
        { value: 'q1', label: t('adminStaffDetail:filter_q1', 'Quý 1') },
        { value: 'this_year', label: t('adminStaffDetail:filter_this_year', 'Năm nay') }
    ];

    return (
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-white/5">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
                {t('adminStaffDetail:perf_metrics_overview')}
            </h2>
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-slate-400 dark:text-slate-500" />
                </div>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10 pr-10 py-2.5 bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 appearance-none transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-[#2c2c2e]"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
