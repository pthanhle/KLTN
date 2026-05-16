import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from 'antd';
import { useOrderDetailLogic } from './hooks/useOrderDetailLogic';

// Components
import { HeaderActions } from './components/HeaderActions';
import { OrderStepper } from './components/OrderStepper';
import { ProductList } from './components/ProductList';
import { FinancialSummary } from './components/FinancialSummary';
import { CustomerInfo } from './components/CustomerInfo';
import { ShippingInfo, VatInfo } from './components/ShippingAndVat';

const AdminOrderDetail = () => {
    const { t } = useTranslation('adminOrderDetail');
    const { order, loading, handleAction } = useOrderDetailLogic();

    return (
        <div className="bg-slate-50 dark:bg-[#0c0c0e] min-h-screen pb-20 animate-in fade-in duration-500">
            <Helmet>
                <title>{order ? `${t('title')} ${order.order_code}` : t('title')} | TT AUTO</title>
            </Helmet>

            <HeaderActions 
                order={order} 
                loading={loading} 
                t={t} 
                onAction={handleAction} 
            />

            <main className="max-w-[1400px] mx-auto px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cột trái (70%) */}
                    <div className="w-full lg:w-[70%] flex flex-col">
                        <OrderStepper order={order} loading={loading} t={t} />
                        
                        {loading ? (
                            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 mb-8">
                                <Skeleton active paragraph={{ rows: 4 }} />
                            </div>
                        ) : (
                            <ProductList items={order?.items} t={t} />
                        )}

                        {loading ? (
                            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5">
                                <Skeleton active paragraph={{ rows: 3 }} />
                            </div>
                        ) : (
                            <FinancialSummary financials={order?.financials} payment={order?.payment} t={t} />
                        )}
                    </div>

                    {/* Cột phải (30%) */}
                    <div className="w-full lg:w-[30%] flex flex-col">
                        {loading ? (
                            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 space-y-8">
                                <Skeleton active paragraph={{ rows: 3 }} />
                                <Skeleton active paragraph={{ rows: 2 }} />
                            </div>
                        ) : (
                            <>
                                <CustomerInfo delivery={order?.delivery} t={t} />
                                <div className="h-8"></div>
                                <ShippingInfo shipping={order?.shipping} status={order?.order_status} t={t} />
                                <VatInfo vatInfo={order?.vat_info} t={t} />
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminOrderDetail;
