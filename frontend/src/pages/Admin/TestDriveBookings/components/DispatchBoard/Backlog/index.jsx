import React from 'react';
import BookingCard from './BookingCard';
import BookingSkeleton from '../../BookingSkeleton';
import { FilterOutlined } from '@ant-design/icons';

const BacklogPane = ({ bookings, isLoading, t, onAssignFromRequest }) => {
    return (
        <section className="w-[320px] xl:w-[350px] shrink-0 h-full flex flex-col bg-slate-50 dark:bg-[#0a0a0a] z-10 border-r border-slate-200 dark:border-white/5 relative">
            <div className="h-[88px] px-6 flex justify-between items-center bg-white dark:bg-[#0a0a0a] rounded-br-xl shrink-0 border-b border-slate-200 dark:border-white/5 z-20">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                        {t('adminTestDriveBookings:pending_assignment', 'Chờ Phân Công')}
                    </h3>
                    <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-xs font-bold px-2 py-0.5 rounded-full flex items-center justify-center">
                        {bookings.length}
                    </span>
                </div>
                <button className="text-slate-400 hover:text-yellow-500 transition-colors">
                    <FilterOutlined className="text-[20px]" />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-transparent">
                {isLoading ? (
                    <BookingSkeleton />
                ) : bookings.length > 0 ? (
                    bookings.map(booking => (
                        <BookingCard key={booking._id} booking={booking} t={t} onAssignFromRequest={onAssignFromRequest} />
                    ))
                ) : (
                    <div className="text-center text-slate-500 dark:text-slate-400 mt-10">
                        {t('adminTestDriveBookings:no_pending_bookings', 'Không có lịch lái thử nào chờ phân công.')}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BacklogPane;
