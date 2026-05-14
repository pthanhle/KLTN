import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard } from 'lucide-react';

export const EmptySettlementState = () => {
    const { t } = useTranslation('adminServiceReception');

    return (
        <section className="flex-1 bg-white dark:bg-[#191f31] rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center p-8 shadow-lg shadow-slate-200/50 dark:shadow-black/20">
            <div className="w-24 h-24 bg-slate-50 dark:bg-[#23293c] rounded-full flex items-center justify-center mb-6 shadow-inner">
                <LayoutDashboard size={40} className="text-slate-300 dark:text-slate-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {t('settlement_terminal_title', 'Trạm xử lý quyết toán')}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
                {t('settlement_empty_state_msg', 'Vui lòng chọn xe trong hàng đợi để tiến hành quyết toán và in hóa đơn.')}
            </p>
        </section>
    );
};
