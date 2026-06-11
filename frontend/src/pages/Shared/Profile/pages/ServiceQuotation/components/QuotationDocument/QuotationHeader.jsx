export const QuotationHeader = ({ quotation, t }) => (
    <header className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-100 dark:border-slate-700 pb-8 mb-8 gap-6 sm:gap-0">
        <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500 flex items-center justify-center rounded shadow-sm">
                    <span className="text-white font-bold text-2xl">TT</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tighter text-slate-800 dark:text-white uppercase">TT AUTO</h1>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                <p>Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, TP.HCM</p>
                <p>Hotline: 1900.8888</p>
                <p>Email: service@ttauto.vn</p>
            </div>
        </div>
        <div className="sm:text-right w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-500 mb-2 tracking-tight">{t('quote_title_doc', 'PHIẾU BÁO GIÁ DỊCH VỤ')}</h2>
            <div className="space-y-1">
                <p className="text-sm font-medium"><span className="text-slate-400">{t('quote_doc_number', 'Số phiếu')}:</span> {quotation.booking_code}</p>
                <p className="text-sm font-medium"><span className="text-slate-400">{t('quote_doc_date', 'Ngày lập')}:</span> {quotation.created_date}</p>
                <div className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${quotation.status === 'WAITING_FOR_APPROVAL' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500'}`}>
                    {quotation.status === 'WAITING_FOR_APPROVAL' ? t('quote_stt_waiting', 'CHỜ PHÊ DUYỆT') : t('quote_stt_approved', 'ĐÃ DUYỆT')}
                </div>
            </div>
        </div>
    </header>
);

export default QuotationHeader;
