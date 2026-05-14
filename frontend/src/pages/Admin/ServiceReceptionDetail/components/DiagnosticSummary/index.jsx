import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList } from 'lucide-react';
import DiagnosticStatsGrid from './DiagnosticStatsGrid';
import DiagnosticGroup from './DiagnosticGroup';
import EmptyDiagnostic from './EmptyDiagnostic';

const DiagnosticSummary = ({ diagnosticData }) => {
    const { t } = useTranslation('adminRODetail');

    if (!diagnosticData || !diagnosticData.groups || !diagnosticData.summary) {
        return <EmptyDiagnostic />;
    }

    const { groups, summary } = diagnosticData;

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="flex justify-between items-center mb-5 border-b border-slate-200 dark:border-white/10 pb-4">
                <h2 className="text-sm font-bold text-slate-800 dark:text-[#dce1fb] flex items-center gap-2 uppercase tracking-widest">
                    <ClipboardList className="w-5 h-5 text-amber-500" />
                    {t('panel_diag_title', 'Báo Cáo Kỹ Thuật')}
                </h2>
                <span className="text-[10px] bg-slate-100 dark:bg-[#23293c] text-slate-500 dark:text-[#d3c5ac] px-2 py-1 rounded font-bold tracking-wider uppercase">
                    {t('diag_results_tag', 'KẾT QUẢ CHẨN ĐOÁN KỸ THUẬT')}
                </span>
            </div>

            <DiagnosticStatsGrid summary={summary} />

            <div className="flex flex-col gap-6">
                {groups.map(group => (
                    <DiagnosticGroup key={group.id} group={group} />
                ))}
            </div>
            
            {diagnosticData.conclusion && (
                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-[#1a1a1c] border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2 block">
                        {t('diag_conclusion', 'Kết luận chung')}
                    </span>
                    <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
                        {diagnosticData.conclusion}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DiagnosticSummary;
