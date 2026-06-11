import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import QuotationTab from '../../../../Customer/ServiceTrackingDetail/components/Quotations_Approval/QuotationTab';
import { useTrackingDetailLogic } from '../../../../Customer/ServiceTrackingDetail/hooks/useTrackingDetailLogic';

const ServiceQuotation = () => {
    const { t } = useTranslation('profile');
    const navigate = useNavigate();

    const {
        isLoading,
        error,
        quotationData,
        setQuotationData
    } = useTrackingDetailLogic();

    return (
        <section className="w-full relative pb-32 transition-all">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
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
                    {isLoading ? (
                        <div className="flex justify-center p-8 animate-pulse text-slate-500">Đang tải dữ liệu báo giá...</div>
                    ) : error ? (
                        <div className="flex justify-center p-8 text-red-500 font-medium bg-red-50 dark:bg-red-500/10 rounded-2xl">
                            {error}
                        </div>
                    ) : quotationData ? (
                        <QuotationTab
                            quotationData={quotationData}
                            setQuotationData={setQuotationData}
                            isFullWidthBar={true}
                        />
                    ) : (
                        <div className="flex justify-center p-8 text-slate-500 font-medium bg-slate-50 dark:bg-white/5 rounded-2xl">
                            Chưa có dữ liệu báo giá.
                        </div>
                    )}
                </div>
            </main>
        </section>
    );
};

export default ServiceQuotation;
