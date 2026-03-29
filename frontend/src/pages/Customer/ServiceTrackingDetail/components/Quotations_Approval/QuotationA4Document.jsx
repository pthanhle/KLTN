import React from 'react';
import { useTranslation } from 'react-i18next';
import QuotationHeader from './Document/QuotationHeader';
import QuotationEntityInfo from './Document/QuotationEntityInfo';
import QuotationItemsTable from './Document/QuotationItemsTable';
import QuotationFinancialSummary from './Document/QuotationFinancialSummary';
import QuotationValidityTerms from './Document/QuotationValidityTerms';
import QuotationSignatures from './Document/QuotationSignatures';

const QuotationA4Document = ({ quotation, calculations }) => {
    const { t } = useTranslation('tracking');

    if (!quotation) return null;

    return (
        <article className="a4-container bg-white dark:bg-[#141416] shadow-2xl rounded-sm border border-slate-200 dark:border-white/5 p-8 md:p-12 flex flex-col min-h-[1100px] print-shadow-none xl:mx-auto mt-2 transition-colors duration-500" data-purpose="a4-document-layout">
            <QuotationHeader quotation={quotation} t={t} />
            <QuotationEntityInfo quotation={quotation} t={t} />
            <QuotationItemsTable parts={quotation.parts} labors={quotation.labors} t={t} />
            <QuotationFinancialSummary quotation={quotation} calculations={calculations} t={t} />
            <QuotationValidityTerms quotation={quotation} t={t} />
            <QuotationSignatures quotation={quotation} t={t} />
        </article>
    );
};

export default QuotationA4Document;
