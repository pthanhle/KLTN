export const QuotationSignatures = ({ quotation, t }) => (
    <footer className="mt-auto pt-10 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center" data-purpose="signatures">
        <div className="flex flex-col items-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-16">{t('quote_sign_customer', 'Khách hàng')}</p>
            <div className="h-px w-24 bg-slate-100 dark:bg-slate-700 mb-2"></div>
            <p className="text-xs italic text-slate-400">{t('quote_sign_note', '(Ký và ghi rõ họ tên)')}</p>
        </div>
        <div className="flex flex-col items-center hidden sm:flex">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-16">{t('quote_sign_advisor', 'Cố vấn dịch vụ')}</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{quotation.advisor_name}</p>
        </div>
        <div className="flex flex-col items-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-16">{t('quote_sign_manager', 'Quản lý trung tâm')}</p>
            <div className="bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded border border-slate-100 dark:border-slate-600">
                <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">{t('quote_sign_approved', 'ĐÃ DUYỆT ĐIỆN TỬ')}</p>
            </div>
        </div>
    </footer>
);

export default QuotationSignatures;
