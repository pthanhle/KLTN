import { useTranslation } from 'react-i18next';
import { useCustomerDetail } from './hooks/useCustomerDetail';
import { DetailHeader } from './components/DetailHeader';
import { DetailSidebar } from './components/DetailSidebar/index.jsx';
import { DetailMainPanel } from './components/DetailMainPanel';
import { CustomerEditorDrawer } from './components/CustomerEditorDrawer';
import { CustomerActionModals } from './components/CustomerActionModals';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CustomerDetailPage = () => {
    const { t } = useTranslation(['adminCustomers', 'admin']);
    const { 
        customer, 
        isLoading, 
        activeTab, 
        setActiveTab, 
        isEditorOpen, 
        setIsEditorOpen,
        isTierModalOpen,
        setIsTierModalOpen,
        isPointsModalOpen,
        setIsPointsModalOpen,
        isActionLoading,
        tiersList,
        orders,
        ordersLoading,
        ordersPagination,
        fetchOrders,
        bookings,
        bookingsLoading,
        bookingsPagination,
        fetchBookings,
        handleCustomerUpdate,
        handleToggleLock,
        handleUpgradeTier,
        handleAddPoints,
    } = useCustomerDetail();
    const navigate = useNavigate();

    return (
        <main className="w-full animate-fade-in pb-12">
            <div className="mb-6">
                <button 
                    type="button" 
                    onClick={() => navigate('/admin/customers')}
                    className="group flex items-center gap-2 px-4 py-2.5 -ml-4 rounded-xl text-[10px] font-black tracking-widest uppercase text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 transition-all outline-none active:scale-95"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {t('adminCustomers:btnBackToList', 'Quay lại danh sách')}
                </button>
            </div>

            <DetailHeader 
                customer={customer} 
                isLoading={isLoading} 
                t={t} 
                onToggleLock={handleToggleLock}
                onOpenTierModal={() => setIsTierModalOpen(true)}
                onOpenPointsModal={() => setIsPointsModalOpen(true)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
                <DetailSidebar 
                    customer={customer} 
                    onUpdate={handleCustomerUpdate}
                    isLoading={isLoading} 
                    t={t} 
                />

                <DetailMainPanel 
                    customer={customer}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isLoading={isLoading}
                    t={t}
                    orders={orders}
                    ordersLoading={ordersLoading}
                    ordersPagination={ordersPagination}
                    onOrdersPageChange={(page) => fetchOrders(page, ordersPagination.limit)}
                    bookings={bookings}
                    bookingsLoading={bookingsLoading}
                    bookingsPagination={bookingsPagination}
                    onBookingsPageChange={(page) => fetchBookings(page, bookingsPagination.limit)}
                />
            </div>
            
            <CustomerEditorDrawer 
                isOpen={isEditorOpen} 
                onClose={() => setIsEditorOpen(false)} 
                customer={customer} 
                tiersList={tiersList}
                t={t}
                onSave={handleCustomerUpdate}
            />

            <CustomerActionModals
                customer={customer}
                isTierModalOpen={isTierModalOpen}
                setIsTierModalOpen={setIsTierModalOpen}
                isPointsModalOpen={isPointsModalOpen}
                setIsPointsModalOpen={setIsPointsModalOpen}
                tiersList={tiersList}
                onUpgradeTier={handleUpgradeTier}
                onAddPoints={handleAddPoints}
                isLoading={isActionLoading}
                t={t}
            />
        </main>
    );
};

export default CustomerDetailPage;
