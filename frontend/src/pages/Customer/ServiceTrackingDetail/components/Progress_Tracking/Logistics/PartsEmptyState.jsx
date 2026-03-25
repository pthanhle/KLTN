import React from 'react';
import { Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PartsEmptyState = () => {
    const { t } = useTranslation('tracking');

    return (
        <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-10 flex flex-col items-center text-center bg-slate-50 dark:bg-[#141416]/50">
            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-[#1e1e20] flex items-center justify-center mb-6 opacity-60">
                <Wrench className="text-slate-500 dark:text-[#a0a0a0]" size={36} strokeWidth={1.5} />
            </div>
            <h4 className="text-slate-800 dark:text-white font-bold text-lg mb-2">
                {t('prog_empty_parts_title', 'Gói dịch vụ Labor-only')}
            </h4>
            <p className="text-slate-500 dark:text-[#a0a0a0] max-w-sm text-sm leading-relaxed">
                {t('prog_empty_parts_desc', 'Gói dịch vụ này chỉ bao gồm nhân công bảo dưỡng, không yêu cầu thay thế linh kiện phần cứng nào.')}
            </p>
            <div className="mt-8 px-6 py-2 bg-slate-200 dark:bg-[#23293c] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#a0a0a0]">
                {t('prog_empty_badge', 'Trạng thái: Tối ưu')}
            </div>
        </div>
    );
};

export default PartsEmptyState;
