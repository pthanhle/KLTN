import React, { useState } from 'react';
import { Pagination, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { TestDriveHeader } from './components/TestDriveHeader';
import { TestDriveToolbar } from './components/TestDriveToolbar';
import BookingStats from './components/BookingStats';
import BookingGrid from './components/BookingGrid/index';
import DispatchBoard from './components/DispatchBoard/index';
import BookingSkeleton from './components/BookingSkeleton';
import AdminCreateBookingDrawer from './components/AdminCreateBookingDrawer/index';
import { useBookingsLogic } from './hooks/useBookingsLogic';

const BookingsPage = () => {
    const { t } = useTranslation(['adminTestDriveBookings', 'layout']);
    const [isDispatchOpen, setIsDispatchOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const { bookings, isLoading, filters, stats, pagination, handleFilterChange } = useBookingsLogic();
    const pendingCount = stats?.pending || 0;

    const breadcrumbItems = [
        { label: t('layout:admin.sider.test-drive-bookings', 'Lái Thử') }
    ];

    return (
        <div className="w-full flex justify-center pb-20 animate-in fade-in duration-500">
            <div className="w-full max-w-[1400px]">

                <TestDriveHeader
                    t={t}
                    breadcrumbItems={breadcrumbItems}
                    onAddBooking={() => setIsCreateOpen(true)}
                    onOpenDispatch={() => setIsDispatchOpen(true)}
                    pendingCount={pendingCount}
                />

                <TestDriveToolbar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    t={t}
                />

                <BookingStats stats={stats} t={t} />

                <div className="mt-8">
                    {isLoading ? (
                        <BookingSkeleton />
                    ) : (
                        <>
                            <BookingGrid bookings={bookings} t={t} onOpenDispatch={() => setIsDispatchOpen(true)} />

                            {pagination.total > 0 && (
                                <div className="mt-8 flex justify-end">
                                    <Pagination
                                        current={pagination.current}
                                        pageSize={pagination.pageSize}
                                        total={pagination.total}
                                        onChange={(page) => handleFilterChange('page', page)}
                                        showSizeChanger={false}
                                        className="[&_.ant-pagination-item-active]:!border-yellow-500 [&_.ant-pagination-item-active_a]:!text-yellow-600 dark:[&_.ant-pagination-item-active]:!bg-yellow-500/10 dark:[&_.ant-pagination-item-active_a]:!text-yellow-500 [&_.ant-pagination-item]:!rounded-full"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>

            <Drawer
                title={
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-800 dark:text-white">
                            {t('adminTestDriveBookings:smart_dispatch', 'Phân Công')}
                        </span>
                    </div>
                }
                placement="bottom"
                styles={{ wrapper: { height: '100vh' } }}
                onClose={() => setIsDispatchOpen(false)}
                open={isDispatchOpen}
                classNames={{
                    wrapper: 'bg-slate-50 dark:bg-[#0a0a0a]',
                    header: 'bg-white dark:bg-[#141416] border-b border-slate-200 dark:border-white/5',
                    body: 'p-0 bg-transparent'
                }}
                closeIcon={<span className="text-slate-400 hover:text-red-500 transition-colors">X</span>}
            >
                <DispatchBoard t={t} />
            </Drawer>

            <AdminCreateBookingDrawer
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </div>
    );
};

export default BookingsPage;
