import React from 'react';
import { Skeleton, Tabs } from 'antd';
import { AdminServiceHistoryCard } from './components/AdminServiceHistoryCard';
import { BookingCard } from '../CustomerBookings/components/BookingCard';
import { Settings, CarFront } from 'lucide-react';

export const CustomerServiceHistory = ({ historyBookings, isLoading, t }) => {
    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse mt-8">
                <Skeleton.Button active size="large" block className="!h-16 !rounded-2xl" />
                <Skeleton.Button active size="large" block className="!h-16 !rounded-2xl" />
            </div>
        );
    }

    const testDriveHistory = historyBookings?.filter(b => b.booking_type === 'test_drive') || [];
    const serviceHistory = historyBookings?.filter(b => b.booking_type === 'service' || b.booking_type === 'maintenance') || [];

    const renderServiceHistoryList = () => {
        if (!serviceHistory || serviceHistory.length === 0) {
            return <div className="p-8 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('Chưa có lịch sử dịch vụ')}</div>;
        }
        return (
            <div className="grid grid-cols-1 gap-6 animate-fade-in">
                {serviceHistory.map((service, index) => (
                    <AdminServiceHistoryCard key={service.id || service._id} service={service} index={index} t={t} />
                ))}
            </div>
        );
    };

    const renderTestDriveHistoryList = () => {
        if (!testDriveHistory || testDriveHistory.length === 0) {
            return <div className="p-8 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('Chưa có lịch sử lái thử')}</div>;
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {testDriveHistory.map(booking => (
                    <BookingCard key={booking.booking_code || booking.id || booking._id} booking={booking} t={t} />
                ))}
            </div>
        );
    };

    const items = [
        {
            key: 'service_history',
            label: (
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <Settings size={14} />
                    {t('Lịch Sử Bảo Dưỡng')} ({serviceHistory?.length || 0})
                </span>
            ),
            children: renderServiceHistoryList(),
        },
        {
            key: 'test_drive_history',
            label: (
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <CarFront size={14} />
                    {t('Lịch Sử Lái Thử')} ({testDriveHistory.length})
                </span>
            ),
            children: renderTestDriveHistoryList(),
        }
    ];

    return (
        <section className="mt-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">
                    {t('Lịch Sử Dịch Vụ Khách Hàng')}
                </h3>
            </div>
            
            <div className="admin-booking-tabs custom-admin-detail-tabs">
                <Tabs defaultActiveKey="service_history" items={items} />
            </div>
        </section>
    );
};
