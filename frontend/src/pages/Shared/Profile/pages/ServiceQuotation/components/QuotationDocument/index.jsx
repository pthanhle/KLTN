import QuotationHeader from './QuotationHeader';
import QuotationInfoGrid from './QuotationInfoGrid';
import QuotationPartsTable from './QuotationPartsTable';
import QuotationLaborTable from './QuotationLaborTable';
import QuotationSummary from './QuotationSummary';
import QuotationSignatures from './QuotationSignatures';

export const QuotationDocument = ({ quotation, calculations, formatCurrency, t }) => {
    if (!quotation) return null;

    return (
        <article className="a4-container bg-white dark:bg-slate-800 shadow-2xl rounded-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12 flex flex-col min-h-[1100px] print-shadow-none xl:mx-auto mt-2" data-purpose="a4-document-layout">
            <QuotationHeader quotation={quotation} t={t} />
            <QuotationInfoGrid quotation={quotation} t={t} />
            <QuotationPartsTable parts={quotation.parts} formatCurrency={formatCurrency} t={t} />
            <QuotationLaborTable labors={quotation.labors} formatCurrency={formatCurrency} t={t} />
            <QuotationSummary quotation={quotation} calculations={calculations} formatCurrency={formatCurrency} t={t} />
            <QuotationSignatures quotation={quotation} t={t} />
        </article>
    );
};

export default QuotationDocument;
