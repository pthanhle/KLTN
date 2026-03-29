import React from 'react';
import { Skeleton } from 'antd';
import { BookingCard } from './components/BookingCard';

export const CustomerBookings = ({ bookings, isLoading, t }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse mt-8">
                <Skeleton.Button active block className="!h-40 !rounded-2xl" />
                <Skeleton.Button active block className="!h-40 !rounded-2xl" />
            </div>
        );
    }

    if (!bookings || bookings.length === 0) {
        return <div className="p-8 mt-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('adminCustomers:emptyBookings', 'Chưa có lịch hẹn nào')}</div>;
    }

    return (
        <section className="space-y-6 mt-8 animate-fade-in">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">
                {t('adminCustomers:upcomingAppointments', 'Danh Sách Lịch Hẹn Đặt Chỗ')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map(booking => (
                    <BookingCard key={booking.booking_code || booking.id} booking={booking} t={t} />
                ))}
            </div>
        </section>
    );
};
