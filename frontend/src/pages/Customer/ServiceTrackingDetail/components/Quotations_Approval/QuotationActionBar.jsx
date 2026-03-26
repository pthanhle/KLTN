import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileDown, XCircle, CheckCircle } from 'lucide-react';

const QuotationActionBar = ({ status, onOpenSignature, onReject }) => {
    const { t } = useTranslation('tracking');

    if (status === 'APPROVED') {
        return (
            <div className="w-full max-w-[900px] mx-auto mt-6" data-purpose="static-action-buttons">
                <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-[#141416] p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm gap-4 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <CheckCircle className="text-emerald-500 w-6 h-6 flex-shrink-0" />
                        <p className="text-[13px] md:text-sm text-emerald-600 dark:text-[#4edea3] font-black uppercase tracking-[0.2em]">
                            {t('quote_bar_approved_msg', 'BÁO GIÁ ĐÃ ĐƯỢC CHỨNG THỰC & KHÓA')}
                        </p>
                    </div>
                    <button className="w-full md:w-auto px-8 py-3 rounded-xl border border-slate-200 dark:border-[#1e1e20] text-slate-600 dark:text-white bg-slate-50 dark:bg-[#1a1a1c] hover:bg-slate-100 dark:hover:bg-[#222224] transition-colors font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                        <FileDown size={14} />
                        {t('quote_bar_pdf', 'Lưu trữ PDF')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[900px] mx-auto mt-6 no-print" data-purpose="static-action-buttons">
            <div className="flex flex-col md:flex-row justify-end items-center gap-3 md:gap-4 w-full">
                <button className="w-full md:w-auto flex-none px-6 py-3.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-[#1e1e20] text-slate-500 dark:text-[#a0a0a0] bg-transparent hover:bg-white dark:hover:bg-[#141416] transition-all font-bold text-[12px] md:text-[13px] uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-none hover:shadow-sm">
                    <FileDown size={16} />
                    {t('quote_bar_pdf', 'Tải PDF')}
                </button>
                <div className="flex w-full md:w-auto gap-3">
                    <button
                        onClick={onReject}
                        className="flex-1 md:flex-none px-5 py-2.5 rounded-md border border-red-100 dark:border-[#ffb4ab]/30 text-red-500 dark:text-[#ffb4ab] bg-white dark:bg-[#141416] hover:bg-red-50 dark:hover:bg-[#ffb4ab]/10 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                    >
                        <XCircle size={16} />
                        {t('quote_bar_reject', 'Từ chối')}
                    </button>
                    <button
                        onClick={onOpenSignature}
                        className="flex-[2] md:flex-none px-8 py-2.5 rounded-md bg-yellow-500 hover:bg-yellow-400 dark:bg-[linear-gradient(135deg,#eab308,#d4af37)] !text-slate-900 border border-transparent shadow-[0_4px_12px_rgba(234,179,8,0.3)] transition-all font-bold text-sm md:text-base transform active:scale-95 flex items-center justify-center gap-2 hover:scale-[1.02] dark:shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
                    >
                        <CheckCircle size={16} />
                        {t('quote_bar_approve', 'Phê duyệt & Thanh toán')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuotationActionBar;
