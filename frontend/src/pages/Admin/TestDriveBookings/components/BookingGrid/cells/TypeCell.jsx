import React from 'react';
import { Home, Store, Hourglass } from 'lucide-react';
import { BOOKING_TYPES } from '../../../constants/testDriveBookingConstants';

export const TypeCell = ({ booking, t }) => {
    const typeInfo = BOOKING_TYPES[booking.bookingType] || {};

    const renderIcon = () => {
        if (booking.bookingType === 'home') return <Home size={12} className="mr-1.5" />;
        if (booking.bookingType === 'showroom') return <Store size={12} className="mr-1.5" />;
        return <Hourglass size={12} className="mr-1.5" />;
    };

    return (
        <div className="flex items-center md:block">
            <span className="md:hidden text-xs uppercase tracking-widest text-slate-500 font-bold w-24">{t('adminTestDriveBookings:col_type', 'Hình Thức')}:</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border whitespace-nowrap ${typeInfo.colorClass}`}>
                {renderIcon()}
                {t(typeInfo.labelKey)}
            </span>
        </div>
    );
};
