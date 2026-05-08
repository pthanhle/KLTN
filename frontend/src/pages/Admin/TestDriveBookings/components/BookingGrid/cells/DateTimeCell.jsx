import React from 'react';
import { CalendarClock } from 'lucide-react';

export const DateTimeCell = ({ booking, t }) => {
    return (
        <div className="flex items-center md:block min-w-0">
            <span className="md:hidden text-xs uppercase tracking-widest text-slate-500 font-bold w-24">{t('adminTestDriveBookings:col_time', 'Thời Gian')}:</span>
            <div className="text-sm text-slate-800 dark:text-white whitespace-nowrap flex md:block items-center">
                <CalendarClock size={14} className="mr-1.5 text-slate-400 md:hidden" />
                <span className="font-bold">{booking.selectedDate}</span>
                <span className="mx-2 md:hidden">•</span>
                <br className="hidden md:block" />
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-semibold tracking-wide uppercase mt-0.5 block">{booking.selectedTimeSlot}</span>
            </div>
        </div>
    );
};
