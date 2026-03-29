import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../utils/trackingDataUtils';

const ApprovalRequestCard = ({ request }) => {
    const { t } = useTranslation('tracking');

    if (!request) return null;

    return (
        <div className="bg-slate-50 dark:bg-[#1e1e20] rounded-xl p-6 mt-4 border border-red-500/20 dark:border-red-500/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex items-start gap-4">
                <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
                <div className="flex-1">
                    <p className="text-slate-800 dark:text-white leading-relaxed font-semibold text-sm mb-1">
                        {request.title}
                    </p>
                    <p className="text-slate-600 dark:text-[#a0a0a0] leading-relaxed text-[13px] mb-5">
                        {request.description}
                    </p>
                    
                    {request.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_5px_15px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 transition-all">
                                {t('prog_btn_approve_price', 'Phê duyệt')}: {formatCurrency(request.price)}
                            </button>
                            <button className="px-6 py-3 border border-red-500/40 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-95 transition-all">
                                {t('prog_btn_reject', 'Từ chối')}
                            </button>
                        </div>
                    )}
                    {request.status === 'approved' && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-[#4edea3] rounded-full border border-emerald-500/20">
                            <span className="text-xs font-bold uppercase tracking-widest">{t('prog_status_approved', 'Đã phê duyệt')}</span>
                        </div>
                    )}
                    {request.status === 'rejected' && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-[#23293c] text-slate-500 dark:text-[#a0a0a0] rounded-full border border-slate-300 dark:border-white/5">
                            <span className="text-xs font-bold uppercase tracking-widest">{t('prog_status_rejected', 'Đã từ chối')}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApprovalRequestCard;
