import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileDown, XCircle, CheckCircle } from 'lucide-react';

const QuotationActionBar = ({ status, onOpenSignature, onReject, isFullWidthBar }) => {
    const { t } = useTranslation('tracking');

    const barLayoutClass = isFullWidthBar
        ? "w-full mt-8"
        : "w-full mt-8";

    if (status === 'APPROVED') {
        return (
            <div className={`${barLayoutClass} bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 p-6 rounded-xl shadow-lg no-print transition-all`} data-purpose="static-action-bar">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-emerald-500 w-5 h-5" />
                        <p className="text-sm text-emerald-600 dark:text-[#4edea3] font-bold uppercase tracking-[0.15em] hidden md:block">
                            {t('quote_bar_approved_msg', 'BÁO GIÁ ĐÃ ĐƯỢC CHỨNG THỰC & KHÓA')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="px-6 py-2.5 rounded-full border border-slate-200 dark:border-[#1e1e20] text-slate-600 dark:text-white bg-white dark:bg-[#141416] hover:bg-slate-50 dark:hover:bg-[#1e1e20] transition-colors font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
                            <FileDown size={14} />
                            {t('quote_bar_pdf', 'Tải bản lưu trữ PDF')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${barLayoutClass} bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 p-6 rounded-xl shadow-lg no-print transition-all`} data-purpose="static-action-bar">
            <div className="flex flex-col xl:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 dark:bg-[#d4af37] animate-pulse shadow-[0_0_10px_rgb(212,175,55)]"></div>
                    <p className="text-xs text-slate-500 dark:text-[#a0a0a0] font-medium hidden md:block">
                        {t('quote_bar_note', 'Báo giá có giá trị trong vòng 07 ngày. Vui lòng kiểm tra kỹ trước khi Phê duyệt.')}
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-2.5 rounded-md border border-slate-200 dark:border-[#1e1e20] text-slate-600 dark:text-white bg-white dark:bg-[#141416] hover:bg-slate-50 dark:hover:bg-[#1e1e20] transition-colors font-semibold text-sm flex items-center justify-center gap-2">
                        <FileDown size={16} />
                        {t('quote_bar_pdf', 'Tải PDF')}
                    </button>
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
