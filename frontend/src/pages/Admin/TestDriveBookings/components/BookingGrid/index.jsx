import React from 'react';
import { GridHeader } from './GridHeader';
import { CustomerCell } from './cells/CustomerCell';
import { TypeCell } from './cells/TypeCell';
import { LocationCell } from './cells/LocationCell';
import { DateTimeCell } from './cells/DateTimeCell';
import { StatusCell } from './cells/StatusCell';
import { AssigneeCell } from './cells/AssigneeCell';
import { CarCell } from './cells/CarCell';

const BookingGrid = ({ bookings, t, onOpenDispatch, onViewDetail }) => {
    if (!bookings?.length) {
        return (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#141416] rounded-xl border border-slate-200 dark:border-white/5">
                {t('adminTestDriveBookings:empty_message', 'Không tìm thấy lịch hẹn nào')}
            </div>
        );
    }

    return (
        <section className="space-y-4 animate-fade-in">
            <GridHeader t={t} />

            {bookings.map((booking) => (
                <div
                    key={booking._id}
                    onClick={() => onViewDetail?.(booking._id)}
                    className="bg-white dark:bg-[#141416] rounded-xl p-4 md:py-4 md:px-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-none border border-slate-100 dark:border-white/5 hover:border-yellow-500/50 dark:hover:border-yellow-500/50 transition-all group cursor-pointer hover:shadow-md hover:-translate-y-0.5 duration-300"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[1.9fr_1.8fr_1fr_2.3fr_1.2fr_0.8fr_1fr] gap-4 items-center">
                        <CustomerCell booking={booking} />
                        <CarCell booking={booking} t={t} />
                        <TypeCell booking={booking} t={t} />
                        <LocationCell booking={booking} t={t} />
                        <DateTimeCell booking={booking} t={t} />
                        <StatusCell booking={booking} t={t} />
                        <AssigneeCell booking={booking} t={t} onOpenDispatch={onOpenDispatch} />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default BookingGrid;
