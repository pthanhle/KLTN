import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';

const OverviewCustomerVoice = ({ note }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-slate-50 dark:bg-[#23293c] p-8 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-white/5 shadow-inner">
            <Quote className="absolute -top-4 -left-2 w-32 h-32 text-slate-200 dark:text-yellow-500/5 select-none rotate-12" strokeWidth={1} />
            
            <div className="relative z-10 space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-600 dark:text-[#ffd165]">
                    {t('title_customer_remarks', 'Customer Remarks')}
                </h3>
                <p className="text-lg font-medium italic leading-relaxed text-slate-800 dark:text-[#dce1fb]">
                    "{note || t('text_no_note', 'Không có ghi chú cụ thể nào được tạo.')}"
                </p>
            </div>
        </div>
    );
};

export default OverviewCustomerVoice;
