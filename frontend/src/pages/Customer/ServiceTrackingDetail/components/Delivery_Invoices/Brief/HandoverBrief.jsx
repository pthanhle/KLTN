import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatOdometer } from '../../../utils/trackingDataUtils';

const HandoverBrief = ({ data }) => {
    const { t } = useTranslation('tracking');

    return (
        <section className="relative overflow-hidden bg-white dark:bg-[#141416] rounded-xl p-10 border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="relative z-10">
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 uppercase">
                    {t('del_title_ready', 'XE ĐÃ SẴN SÀNG BÀN GIAO')}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tech Box 1 */}
                    <div className="bg-slate-50 dark:bg-[#1e1e20] rounded-lg p-6 border-l-4 border-yellow-500 shadow-sm dark:shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-[#a0a0a0] mb-2">
                            {t('del_odo_out', 'Số ODO Bàn Giao')}
                        </p>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-[#d4af37]">
                            {formatOdometer(data.odo_out)} <span className="text-sm font-normal text-slate-500 dark:text-[#a0a0a0]">km</span>
                        </p>
                    </div>

                    {/* Tech Box 2 */}
                    <div className="bg-slate-50 dark:bg-[#1e1e20] rounded-lg p-6 border-l-4 border-emerald-500 shadow-sm dark:shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-[#a0a0a0] mb-2">
                            {t('del_next_maint', 'Bảo dưỡng định kỳ tiếp theo')}
                        </p>
                        <p className="text-lg font-bold text-emerald-600 dark:text-[#4edea3]">
                            {new Date(data.next_maintenance_date).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-[#a0a0a0] font-medium mt-1">
                            {t('del_or', 'hoặc')} {formatOdometer(data.next_maintenance_km)} km
                        </p>
                    </div>

                    {/* Tech Box 3 */}
                    <div className="bg-slate-50 dark:bg-[#1e1e20] rounded-lg p-6 border-l-4 border-blue-500 shadow-sm dark:shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-[#a0a0a0] mb-2">
                            {t('del_warranty', 'Thời hạn bảo hành (Mới)')}
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-[#83cfff]">
                            {data.warranty_months} <span className="text-sm font-normal text-slate-500 dark:text-[#a0a0a0]">{t('gen_months', 'tháng')}</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* Background Decorative Graphic */}
            <div className="absolute -right-20 -bottom-20 opacity-5 dark:opacity-10 pointer-events-none select-none text-slate-300 dark:text-white">
                <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                    <circle cx="7" cy="17" r="2"/>
                    <path d="M9 17h6"/>
                    <circle cx="17" cy="17" r="2"/>
                </svg>
            </div>
        </section>
    );
};

export default HandoverBrief;
