import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from 'antd';
import { useOrderDetailLogic } from './hooks/useOrderDetailLogic';

import { HeaderActions } from './components/Header';
import { OrderStepper } from './components/Stepper';
import { ProductList } from './components/ProductSection';
import { FinancialSummary } from './components/InfoCards/FinancialSummary';
import { CustomerInfo } from './components/InfoCards/CustomerInfo';
import { StaffAssignmentInfo } from './components/StaffAssignmentInfo';
import { ShippingInfo, VatInfo } from './components/InfoCards/ShippingAndVat';
import { ExceptionBanner } from './components/Alerts/ExceptionBanner';
import { ActivityTimeline } from './components/Timeline/ActivityTimeline';
import { ShippingModal } from './components/Modals/ShippingModal';
import { CancelModal } from './components/Modals/CancelModal';
import { PrintModal } from './components/Modals/PrintModal';
import { ReassignModal } from './components/Modals/ReassignModal';

const AdminOrderDetail = () => {
    const { t } = useTranslation('adminOrderDetail');
    const {
        order,
        loading,
        handleAction,
        isShippingModalVisible,
        setIsShippingModalVisible,
        handleShippingSubmit,
        isCancelModalVisible,
        setIsCancelModalVisible,
        handleCancelSubmit,
        isPrintModalVisible,
        setIsPrintModalVisible,
        isReassignModalVisible,
        setIsReassignModalVisible,
        handleReassignSubmit
    } = useOrderDetailLogic();

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
                {!loading && order?.exception_issue && (
                    <ExceptionBanner issue={order.exception_issue} />
                )}

                <div className="flex flex-col lg:flex-row gap-8">
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

                    <div className="w-full lg:w-[30%] flex flex-col">
                        {loading ? (
                            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 space-y-8">
                                <Skeleton active paragraph={{ rows: 3 }} />
                                <Skeleton active paragraph={{ rows: 2 }} />
                            </div>
                        ) : (
                            <>
                                <CustomerInfo delivery={order?.delivery} t={t} />
                                <StaffAssignmentInfo
                                    assignment={order?.assignment}
                                    t={t}
                                    onReassign={() => handleAction('reassign_staff')}
                                    orderStatus={order?.order_status}
                                />
                                <div className="h-8"></div>
                                <ShippingInfo shipping={order?.shipping} status={order?.order_status} t={t} />
                                <VatInfo vatInfo={order?.vat_info} t={t} />
                                {order?.activity_log && order.activity_log.length > 0 && (
                                    <>
                                        <div className="h-8"></div>
                                        <ActivityTimeline logs={order.activity_log} />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            <ShippingModal
                isOpen={isShippingModalVisible}
                onCancel={() => setIsShippingModalVisible(false)}
                onSubmit={handleShippingSubmit}
                order={order}
            />

            <CancelModal
                isOpen={isCancelModalVisible}
                onCancel={() => setIsCancelModalVisible(false)}
                onSubmit={handleCancelSubmit}
                order={order}
            />

            <PrintModal
                isOpen={isPrintModalVisible}
                onCancel={() => setIsPrintModalVisible(false)}
                order={order}
            />

            <ReassignModal
                isOpen={isReassignModalVisible}
                onCancel={() => setIsReassignModalVisible(false)}
                onSubmit={handleReassignSubmit}
                currentStaffId={
                    typeof order?.assignment?.assigned_staff_id === 'object'
                        ? order?.assignment?.assigned_staff_id?._id?.toString()
                        : order?.assignment?.assigned_staff_id
                }
            />
        </div>
    );
};

export default AdminOrderDetail;
