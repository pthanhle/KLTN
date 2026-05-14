import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ClipboardList } from 'lucide-react';

const EmptyDiagnostic = () => {
    const { t } = useTranslation('adminRODetail');

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm flex flex-col h-full min-h-[300px]">
            <div className="flex justify-between items-center mb-5 border-b border-slate-200 dark:border-white/10 pb-4">
                <h2 className="text-sm font-bold text-slate-800 dark:text-[#dce1fb] flex items-center gap-2 uppercase tracking-widest">
                    <ClipboardList className="w-5 h-5 text-amber-500 opacity-50" />
                    {t('panel_diag_title', 'Báo Cáo Kỹ Thuật')}
                </h2>
                <span className="text-[10px] bg-slate-100 dark:bg-[#23293c] text-slate-400 dark:text-slate-500 px-2 py-1 rounded font-bold tracking-wider uppercase">
                    {t('diag_results_tag', 'KẾT QUẢ CHẨN ĐOÁN KỸ THUẬT')}
                </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-4 border border-slate-100 dark:border-white/5">
                    <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-700 dark:text-[#dce1fb] uppercase tracking-widest mb-2">
                    {t('empty_diag_title', 'Chưa có Báo Cáo Kỹ Thuật')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[250px] leading-relaxed">
                    {t('empty_diag_desc', 'Kỹ thuật viên đang trong quá trình kiểm tra xe hoặc chờ phân công.')}
                </p>
            </div>
        </div>
    );
};

export default EmptyDiagnostic;
