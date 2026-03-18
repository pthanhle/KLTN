import { FileDown, XCircle, CheckCircle } from 'lucide-react';

export const QuotationActionBar = ({ handleApprove, handleReject, t }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200/60 dark:border-slate-800/60 p-5 no-print shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 transition-all" data-purpose="fixed-action-bar">
            <div className="max-w-[850px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {t('quote_bar_note', 'Báo giá có giá trị trong 07 ngày. Vui lòng kiểm tra kỹ trước khi phê duyệt.')}
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-2.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-semibold text-sm flex items-center justify-center gap-2">
                        <FileDown size={16} />
                        {t('quote_bar_pdf', 'Tải PDF')}
                    </button>
                    <button 
                        onClick={handleReject}
                        className="flex-1 md:flex-none px-5 py-2.5 rounded-md border border-red-100 text-red-500 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                    >
                        <XCircle size={16} />
                        {t('quote_bar_reject', 'Từ chối')}
                    </button>
                    <button 
                        onClick={handleApprove}
                        className="flex-[2] md:flex-none px-8 py-2.5 rounded-md bg-yellow-500 hover:bg-yellow-400 text-slate-900 shadow-[0_4px_12px_rgba(234,179,8,0.3)] transition-all font-black text-sm transform active:scale-95 flex items-center justify-center gap-2"
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
