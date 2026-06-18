import React from 'react';
import { BookingCard } from './BookingCard';

export const BookingsList = ({ list, t }) => {
    if (!list || list.length === 0) {
        return (
            <div className="p-8 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                {t('Chưa có lịch hẹn nào')}
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {list.map(booking => (
                <BookingCard key={booking.booking_code || booking.id || booking._id} booking={booking} t={t} />
            ))}
        </div>
    );
};
