import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

const DiagnosticStatsGrid = ({ summary }) => {
    const { t } = useTranslation('adminRODetail');

    return (
        <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-slate-50 dark:bg-[#1a1a1c] border border-slate-200 dark:border-white/5 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-slate-700 dark:text-white">{summary.total_items}</span>
                <span className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-wider font-semibold mt-1">{t('diag_total_items', 'Tổng hạng mục')}</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{summary.normal}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-500 uppercase tracking-wider font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3"/> {t('diag_normal', 'Bình thường')}
                </span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{summary.warning}</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-500 uppercase tracking-wider font-semibold mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3"/> {t('diag_warning', 'Cần lưu ý')}
                </span>
            </div>
            <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">{summary.critical}</span>
                <span className="text-[10px] text-rose-600 dark:text-rose-500 uppercase tracking-wider font-semibold mt-1 flex items-center gap-1">
                    <AlertOctagon className="w-3 h-3"/> {t('diag_critical', 'Cần thay thế')}
                </span>
            </div>
        </div>
    );
};

export default DiagnosticStatsGrid;
