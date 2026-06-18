import React from 'react';
import { Tabs } from 'antd';
import { Settings, CarFront } from 'lucide-react';
import { BookingsSkeleton } from './components/BookingsSkeleton';
import { BookingsList } from './components/BookingsList';
import { useCustomerBookings } from './hooks/useCustomerBookings';

export const CustomerBookings = ({ bookings, isLoading, t }) => {
    const { serviceBookings, testDriveBookings } = useCustomerBookings(bookings);

    if (isLoading) {
        return <BookingsSkeleton />;
    }

    if (!bookings || bookings.length === 0) {
        return <div className="p-8 mt-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('Chưa có lịch hẹn nào')}</div>;
    }

    const items = [
        {
            key: 'service',
            label: (
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <Settings size={14} />
                    {t('Dịch vụ & Bảo dưỡng')} ({serviceBookings.length})
                </span>
            ),
            children: <BookingsList list={serviceBookings} t={t} />,
        },
        {
            key: 'test_drive',
            label: (
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <CarFront size={14} />
                    {t('Lái thử xe')} ({testDriveBookings.length})
                </span>
            ),
            children: <BookingsList list={testDriveBookings} t={t} />,
        }
    ];

    return (
        <section className="mt-8 animate-fade-in">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white mb-6">
                {t('Danh Sách Lịch Hẹn Khách Hàng')}
            </h3>
            
            <div className="admin-booking-tabs">
                <Tabs defaultActiveKey="service" items={items} />
            </div>
        </section>
    );
};
