import React from 'react';
import { useTranslation } from 'react-i18next';
import DiagnosticItem from './DiagnosticItem';

const DiagnosticGroup = ({ group }) => {
    const { t } = useTranslation('adminRODetail');

    return (
        <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden">
            <div className="bg-slate-50 dark:bg-[#1a1a1c] px-4 py-3 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800 dark:text-[#dce1fb]">{group.title}</h3>
                <span className="text-xs font-mono text-slate-500 dark:text-[#d3c5ac]">
                    {group.totalCount} {t('diag_items_count', 'Hạng mục')}
                </span>
            </div>
            
            <div className="p-4 flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {group.items.map((item, idx) => (
                        <DiagnosticItem key={idx} item={item} />
                    ))}
                </div>

                {group.technician_note && (
                    <div className="mt-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-3 rounded-lg flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                            {t('diag_tech_note', 'Ghi chú kỹ thuật viên')}
                        </span>
                        <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                            {group.technician_note}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiagnosticGroup;
