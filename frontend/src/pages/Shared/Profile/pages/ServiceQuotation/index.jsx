import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuotationLogic } from './hooks/useQuotationLogic';
import QuotationDocument from './components/QuotationDocument';
import QuotationActionBar from './components/QuotationActionBar';
import { ArrowLeft } from 'lucide-react';

const ServiceQuotation = () => {
    const { t } = useTranslation('profile');
    // Determine ID from URL if using React Router, or you can pass props if rendered conditionally
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Pass ID to logic to fetch mock data
    const { 
        quotation, 
        calculations, 
        formatCurrency, 
        handleApprove, 
        handleReject 
    } = useQuotationLogic(id);

    return (
        <section className="w-full relative pb-32 transition-all">
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={() => window.history.back()}
                    className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-[24px] sm:text-[28px] font-black tracking-tight text-slate-900 dark:text-white">
                    {t('quote_title_page', 'Chi tiết Báo giá Điện tử')}
                </h2>
            </div>

            <main className="w-full flex-col flex items-center mb-12" data-purpose="quotation-modal">
                <div className="w-full max-w-[850px]">
                    <QuotationDocument 
                        quotation={quotation} 
                        calculations={calculations} 
                        formatCurrency={formatCurrency} 
                        t={t}
                    />
                </div>
            </main>

            <QuotationActionBar 
                handleApprove={handleApprove} 
                handleReject={handleReject} 
                t={t}
            />
        </section>
    );
};

export default ServiceQuotation;
