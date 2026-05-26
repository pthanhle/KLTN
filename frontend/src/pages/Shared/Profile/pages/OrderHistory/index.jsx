import OrderCard from './components/OrderCard/index.jsx';
import { useOrderHistoryLogic } from './hooks/useOrderHistoryLogic';
import { Skeleton } from '@/components/ui/skeleton';

const OrderHistory = () => {
    const { t, TABS, activeTab, setActiveTab, filteredOrders, isLoading, handleCancelOrder, handleConfirmReceipt } = useOrderHistoryLogic();

    return (
        <section className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-[28px] font-black tracking-tight text-slate-900 dark:text-white">
                    {t('order_history_title', 'Lịch sử giao dịch')}
                </h2>
                
                {/* Tabs Filter */}
                <nav className="flex gap-6 border-b border-slate-200 dark:border-white/10 overflow-x-auto custom-scrollbar pb-1">
                    {TABS.map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-[14px] font-bold whitespace-nowrap transition-colors ${
                                activeTab === tab 
                                    ? 'border-b-2 border-slate-900 dark:border-white text-slate-900 dark:text-white' 
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="grid gap-6">
                {isLoading ? (
                    [1, 2, 3].map(idx => (
                        <div key={idx} className="bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 rounded-[24px] p-6">
                            <div className="flex justify-between items-center mb-6">
                                <Skeleton className="w-1/3 h-6" />
                                <Skeleton className="w-24 h-6 rounded-full" />
                            </div>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-4">
                                    <Skeleton className="w-24 h-24 rounded-2xl" />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Skeleton className="w-3/4 h-5" />
                                        <Skeleton className="w-1/2 h-4" />
                                        <Skeleton className="w-1/4 h-5 mt-auto" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-white/5">
                                <Skeleton className="w-40 h-6" />
                                <Skeleton className="w-32 h-10 rounded-xl" />
                            </div>
                        </div>
                    ))
                ) : (
                    filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <OrderCard 
                                key={order.order_code} 
                                order={order} 
                                t={t} 
                                handleCancelOrder={() => handleCancelOrder(order._id)}
                                handleConfirmReceipt={() => handleConfirmReceipt(order._id)}
                            />
                        ))
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-slate-500 font-medium">
                                {t('order_empty', 'Bạn chưa có đơn hàng nào trong phân loại này.')}
                            </p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default OrderHistory;
