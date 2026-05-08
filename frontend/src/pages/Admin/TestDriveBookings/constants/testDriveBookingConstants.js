export const BOOKING_STATUSES = {
    Pending: {
        value: 'Pending',
        colorClass: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-500 dark:border-yellow-500/30',
        labelKey: 'adminTestDriveBookings:status_pending'
    },
    Confirmed: {
        value: 'Confirmed',
        colorClass: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30',
        labelKey: 'adminTestDriveBookings:status_confirmed'
    },
    InProgress: {
        value: 'InProgress',
        colorClass: 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/30',
        labelKey: 'adminTestDriveBookings:status_inprogress'
    },
    Completed: {
        value: 'Completed',
        colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
        labelKey: 'adminTestDriveBookings:status_completed'
    },
    Cancelled: {
        value: 'Cancelled',
        colorClass: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30',
        labelKey: 'adminTestDriveBookings:status_cancelled'
    }
};

export const BOOKING_TYPES = {
    home: {
        value: 'home',
        icon: 'home',
        colorClass: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30',
        labelKey: 'adminTestDriveBookings:type_home'
    },
    showroom: {
        value: 'showroom',
        icon: 'store',
        colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
        labelKey: 'adminTestDriveBookings:type_showroom'
    },
    waitlist: {
        value: 'waitlist',
        icon: 'hourglass_empty',
        colorClass: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-500 dark:border-yellow-500/30',
        labelKey: 'adminTestDriveBookings:type_waitlist'
    }
};

export const FILTER_STATUS_OPTIONS = [
    { value: 'all', labelKey: 'adminTestDriveBookings:filter_status_all' },
    { value: 'Pending', labelKey: 'adminTestDriveBookings:status_pending' },
    { value: 'Confirmed', labelKey: 'adminTestDriveBookings:status_confirmed' },
    { value: 'Completed', labelKey: 'adminTestDriveBookings:status_completed' }
];

export const FILTER_TYPE_OPTIONS = [
    { value: 'all', labelKey: 'adminTestDriveBookings:filter_type_all' },
    { value: 'home', labelKey: 'adminTestDriveBookings:type_home' },
    { value: 'showroom', labelKey: 'adminTestDriveBookings:type_showroom' }
];
