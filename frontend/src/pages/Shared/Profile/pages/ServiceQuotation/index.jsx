import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { getQuotationData } from '../../../../Customer/ServiceTrackingDetail/data/mockQuotationData';
import QuotationTab from '../../../../Customer/ServiceTrackingDetail/components/Quotations_Approval/QuotationTab';

const ServiceQuotation = () => {
    const { t } = useTranslation('profile');
    // Determine ID from URL if using React Router, or you can pass props if rendered conditionally
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Dùng chung Data Source từ lõi Tracking Data Utils
    const [quotationData, setQuotationData] = useState(null);

    useEffect(() => {
        // Đồng bộ hoàn toàn luồng móc Data với trang Tracking Detail
        const data = getQuotationData(id);
        setQuotationData(data);
    }, [id]);

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

            <main className="w-full flex-col flex items-center mb-12">
                <div className="w-full max-w-4xl relative">
                    <QuotationTab 
                        quotationData={quotationData} 
                        setQuotationData={setQuotationData} 
                        isFullWidthBar={true}
                    />
                </div>
            </main>
        </section>
    );
};

export default ServiceQuotation;
