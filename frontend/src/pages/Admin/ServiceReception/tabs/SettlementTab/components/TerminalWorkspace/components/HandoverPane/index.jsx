import React from 'react';
import { useTranslation } from 'react-i18next';
import { KcsTaskItem } from './components/KcsTaskItem';

export const HandoverPane = ({ kcsTasks }) => {
    const { t } = useTranslation('adminServiceReception');

    return (
        <section className="bg-white dark:bg-[#141416] rounded-xl p-6 border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-sm mt-6 mb-6 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-slate-50/50 dark:from-transparent dark:to-[#0a0a0b]/50 pointer-events-none"></div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5 relative z-10">
                {t('settlement_kcs_title', 'Danh sách KCS bàn giao')}
            </h3>

            <div className="space-y-4 relative z-10">
                {kcsTasks.length === 0 ? (
                    <div className="text-sm text-slate-400 italic">{t('settlement_no_kcs', 'Không tìm thấy công việc KCS.')}</div>
                ) : (
                    kcsTasks.map(task => (
                        <KcsTaskItem key={task.id} task={task} />
                    ))
                )}
            </div>
        </section>
    );
};
