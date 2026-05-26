import { useParams } from 'react-router-dom';
import { useOrderDetailLogic } from './hooks/useOrderDetailLogic';

import OrderHeader from './components/OrderHeader';
import OrderStepper from './components/OrderStepper';
import OrderMetaInfo from './components/OrderMetaInfo';
import OrderItemsList from './components/OrderItemsList';
import OrderSummary from './components/OrderSummary';
import { Skeleton } from '@/components/ui/skeleton';

const OrderDetail = () => {
    const { id } = useParams();
    const { 
        t, 
        orderDetail, 
        statusConfig, 
        formatCurrency, 
        handleCopy,
        steps,
        currentStepIndex,
        isPending,
        isCompleted,
        isShipping,
        isCancelled,
        handleCancelOrder,
        handleConfirmReceipt,
        handleReview,
        handleReorder,
        isLoading
    } = useOrderDetailLogic(id);

    if (isLoading) return (
        <div className="w-full flex-col flex animate-fadeIn transition-colors animate-pulse mb-20">
            <main className="w-full max-w-5xl mx-auto space-y-6">
                <Skeleton className="w-1/3 h-10 mb-8" />
                <Skeleton className="w-full h-32 rounded-[24px]" />
                <Skeleton className="w-full h-48 rounded-[24px]" />
                <Skeleton className="w-full h-64 rounded-[24px]" />
                <Skeleton className="w-full h-48 rounded-[24px]" />
            </main>
        </div>
    );

    if (!orderDetail) return <div className="p-8 text-center text-slate-500 font-medium">{t('order_not_found', 'Không tìm thấy hóa đơn/đơn hàng này.')}</div>;

    return (
        <div className="w-full flex-col flex animate-fadeIn transition-colors mb-20">
            <main className="w-full max-w-5xl mx-auto space-y-6">
                <OrderHeader orderDetail={orderDetail} t={t} />
                <OrderStepper status={orderDetail.order_status} steps={steps} currentStepIndex={currentStepIndex} />
                <OrderMetaInfo orderDetail={orderDetail} handleCopy={handleCopy} isCancelled={isCancelled} t={t} />
                <OrderItemsList items={orderDetail.items} isCompleted={isCompleted} handleReview={handleReview} formatCurrency={formatCurrency} t={t} />
                <OrderSummary financials={orderDetail.financials} isPending={isPending} isShipping={isShipping} handleCancelOrder={handleCancelOrder} handleConfirmReceipt={handleConfirmReceipt} handleReorder={handleReorder} formatCurrency={formatCurrency} t={t} />
            </main>
        </div>
    );
};

export default OrderDetail;
