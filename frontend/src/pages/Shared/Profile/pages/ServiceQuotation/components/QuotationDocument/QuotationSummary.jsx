export const QuotationSummary = ({ quotation, calculations, formatCurrency, t }) => (
    <section className="flex justify-end mt-4 mb-12" data-purpose="totals-calculation">
        <div className="w-full max-w-[340px] bg-slate-50 dark:bg-slate-700/20 p-6 rounded-lg border border-slate-100 dark:border-slate-600 space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t('quote_sum_parts', 'Cộng phụ tùng')}:</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{formatCurrency(calculations.partsTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t('quote_sum_labor', 'Cộng tiền công')}:</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{formatCurrency(calculations.laborTotal)}</span>
            </div>
            <div className="flex justify-between text-sm pb-3 border-b border-slate-200 dark:border-slate-600">
                <span className="text-slate-500">{t('quote_sum_vat', 'Thuế VAT')} ({quotation.vat_rate * 100}%):</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{formatCurrency(calculations.vatAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{t('quote_sum_total', 'Tổng thanh toán')}:</span>
                <span className="text-xl font-extrabold text-yellow-500">{formatCurrency(calculations.totalAmount)}</span>
            </div>
        </div>
    </section>
);

export default QuotationSummary;
