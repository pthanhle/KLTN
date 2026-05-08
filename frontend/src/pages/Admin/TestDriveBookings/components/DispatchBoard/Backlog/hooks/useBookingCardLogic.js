import { getBookingTypeTheme } from '../../../../utils/dispatch.utils';

export const useBookingCardLogic = (booking, isDragging, t) => {
    const isHome = booking.bookingType === 'home';
    const typeTheme = getBookingTypeTheme(isHome);

    const typeBadgeLabel = isHome 
        ? t('adminTestDriveBookings:home_badge', 'Tại Nhà') 
        : t('adminTestDriveBookings:showroom_badge', 'Showroom');

    const cardClassNames = `bg-white dark:bg-[#141416] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm cursor-grab hover:-translate-y-1 transition-all duration-300 relative group
        ${typeTheme.border}
        ${isDragging ? 'shadow-xl scale-105 rotate-2' : 'hover:shadow-md'}
    `;

    const carName = booking.targetCar?.name || booking.targetCarSku;
    const requestedStaff = booking.requestedStaff || [];
    const hasRequests = requestedStaff.length > 0;
    
    const requestedClaimLabel = t('adminTestDriveBookings:staff_requested_claim', 'NV Yêu cầu:');

    return {
        isHome,
        typeTheme,
        typeBadgeLabel,
        cardClassNames,
        carName,
        requestedStaff,
        hasRequests,
        requestedClaimLabel
    };
};
