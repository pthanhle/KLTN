import React from 'react';
import { useTranslation } from 'react-i18next';
import { QrCode } from 'lucide-react';

const GatePass = ({ data }) => {
    const { t } = useTranslation('tracking');

    return (
        <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0a0a0b] dark:to-[#111827] relative overflow-hidden w-full rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 shadow-sm text-center h-full flex flex-col justify-center">
            {/* Ambient Background Spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="mb-8 flex flex-col items-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
                        {t('del_gate_cleared', 'ĐÃ THANH TOÁN & CHO PHÉP XUẤT XƯỞNG')}
                    </span>
                </div>
                
                {/* Minimal QR Box */}
                <div className="w-full aspect-square max-w-[240px] bg-white dark:bg-[#080809] rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-center p-8 relative group cursor-pointer overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <QrCode className="w-full h-full text-slate-800 dark:text-white/80" strokeWidth={1} />
                </div>
            </div>
            
            <div className="space-y-4 relative z-10">
                <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed px-4 font-bold">
                    {data.code}
                </p>
                <p className="text-slate-500 dark:text-gray-500 text-[10px] italic uppercase tracking-widest">
                    {t('del_scan_gate', 'Trình mã này cho Bảo Vệ Cổng để mở Barie ra ngoài')}
                </p>
                <a className="inline-block text-emerald-600 dark:text-emerald-400 text-xs font-semibold hover:text-emerald-500 dark:hover:text-emerald-300 underline underline-offset-4 transition-colors cursor-pointer mt-4 uppercase tracking-widest">
                    {t('del_download_pass', 'Tải Thẻ Ra Cổng')}
                </a>
            </div>
        </section>
    );
};

export default GatePass;
