import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Droplets, Truck } from 'lucide-react';

const QcNotificationBanner = ({ estimatedTime }) => {
    const { t } = useTranslation('tracking');

    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 to-emerald-400/5 dark:from-[#4edea3]/20 dark:to-[#4edea3]/10 p-6 md:p-8 rounded-xl border-l-4 border-emerald-500 dark:border-[#4edea3] backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 relative z-10">
                    <span className=" text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-600 dark:text-[#4edea3]">
                        {t('label_ready_status', 'Trạng thái sẵn sàng')}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {t('text_estimate_1', 'Xe dự kiến sẵn sàng bàn giao vào lúc')} <span className="text-emerald-600 dark:text-[#4edea3]">{estimatedTime}</span> {t('text_estimate_2', 'hôm nay')}
                    </h2>
                </div>
                <div className="flex -space-x-4 relative z-10">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-50 dark:border-[#0A0A0B] bg-white dark:bg-[#23293c] flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-[#4edea3]" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-slate-50 dark:border-[#0A0A0B] bg-white dark:bg-[#23293c] flex items-center justify-center shadow-sm">
                        <Droplets className="w-6 h-6 text-emerald-500 dark:text-[#4edea3]" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-slate-50 dark:border-[#0A0A0B] bg-white dark:bg-[#23293c] flex items-center justify-center shadow-sm">
                        <Truck className="w-6 h-6 text-slate-400 dark:text-[#d3c5ac]" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QcNotificationBanner;
