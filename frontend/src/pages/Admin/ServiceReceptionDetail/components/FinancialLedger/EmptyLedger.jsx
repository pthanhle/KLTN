import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, FileSignature } from 'lucide-react';
import StatusBanner from './StatusBanner';

const EmptyLedger = ({ status }) => {
    const { t } = useTranslation('adminRODetail');

    return (
        <div className="flex flex-col gap-6 h-full">
            <StatusBanner status={status || 'PENDING'} />

            <div className="bg-white dark:bg-[#141416] rounded-xl border border-slate-200 dark:border-white/5 flex-1 flex flex-col overflow-hidden shadow-sm min-h-[300px]">
                <div className="p-4 md:p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-[#1a1a1c]">
                    <h2 className="text-xs font-bold text-slate-500 dark:text-[#d3c5ac] flex items-center gap-2 uppercase tracking-widest">
                        <FileText className="w-4 h-4 opacity-50" />
                        {t('panel_ledger_entries_title', 'Bảng kê chi tiết')}
                    </h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 dark:bg-transparent">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-white/5 flex items-center justify-center mb-4 border border-slate-200 dark:border-white/10 shadow-sm">
                        <FileSignature className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 dark:text-[#dce1fb] uppercase tracking-widest mb-2">
                        {t('empty_ledger_title', 'Chưa có Báo Giá')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[250px] leading-relaxed">
                        {t('empty_ledger_desc', 'Báo giá sẽ được lập sau khi hoàn tất chẩn đoán kỹ thuật.')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmptyLedger;
