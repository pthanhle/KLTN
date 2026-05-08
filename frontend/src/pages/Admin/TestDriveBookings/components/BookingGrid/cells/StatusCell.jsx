import React from 'react';
import { BOOKING_STATUSES } from '../../../constants/testDriveBookingConstants';

export const StatusCell = ({ booking, t }) => {
    const statusInfo = BOOKING_STATUSES[booking.status] || {};

    return (
        <div className="flex items-center justify-start md:justify-center">
            <span className="md:hidden text-xs uppercase tracking-widest text-slate-500 font-bold w-24">{t('adminTestDriveBookings:col_status', 'Trạng Thái')}:</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border whitespace-nowrap ${statusInfo.colorClass}`}>
                {t(statusInfo.labelKey)}
            </span>
        </div>
    );
};
