import { Tabs, Skeleton } from 'antd';
import { CustomerGarageCards } from './CustomerGarageCards';
import { CustomerTimeline } from './CustomerTimeline';
import { CustomerServiceHistory } from './CustomerServiceHistory';
import { CustomerBookings } from './CustomerBookings';
import { CustomerLoyalty } from './CustomerLoyalty';
import { CustomerContractsTab } from './CustomerContractsTab/index.jsx';
import { getDetailTabs } from '../../constants/detailTabs';

export const DetailMainPanel = ({
    customer, activeTab, setActiveTab, isLoading, t,
    orders, ordersLoading, ordersPagination, onOrdersPageChange,
    bookings, bookingsLoading, bookingsPagination, onBookingsPageChange,
}) => {

    if (isLoading || !customer) {
        return (
            <section className="lg:col-span-7 space-y-10 animate-pulse">
                <div className="flex gap-8 border-b border-slate-200 dark:border-white/10 pb-1">
                    <Skeleton.Input active size="small" className="w-24" />
                    <Skeleton.Input active size="small" className="w-32" />
                    <Skeleton.Input active size="small" className="w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton.Button active className="!w-full !h-64 !rounded-2xl" />
                    <Skeleton.Button active className="!w-full !h-64 !rounded-2xl opacity-60" />
                </div>
            </section>
        );
    }

    const items = getDetailTabs(t).map(tab => {
        let content;
        switch (tab.key) {
            case 'GARAGE':
                content = <CustomerGarageCards garage={customer.garage} t={t} />;
                break;
            case 'HISTORY':
                content = (
                    <CustomerServiceHistory
                        historyBookings={bookings?.filter(b => ['COMPLETED', 'CANCELLED'].includes(b.booking_status || b.status))}
                        isLoading={bookingsLoading}
                        pagination={bookingsPagination}
                        onPageChange={onBookingsPageChange}
                        t={t}
                    />
                );
                break;
            case 'BOOKINGS':
                content = (
                    <CustomerBookings
                        bookings={bookings}
                        isLoading={bookingsLoading}
                        pagination={bookingsPagination}
                        onPageChange={onBookingsPageChange}
                        t={t}
                    />
                );
                break;
            case 'LOYALTY':
                content = <CustomerLoyalty loyaltyData={customer.loyalty} loyaltyHistory={customer.loyalty_history} isLoading={isLoading} t={t} />;
                break;
            case 'CONTRACTS':
                content = <CustomerContractsTab customerId={customer._id} />;
                break;
            default:
                content = null;
        }
        return { ...tab, children: content };
    });

    return (
        <section className="lg:col-span-7">
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={items}
                className="custom-admin-detail-tabs dark:text-slate-300 mb-6"
                tabBarStyle={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
            />

            {activeTab === 'GARAGE' && (
                <CustomerTimeline engagements={customer.upcoming_engagements} t={t} />
            )}
        </section>
    );
};
