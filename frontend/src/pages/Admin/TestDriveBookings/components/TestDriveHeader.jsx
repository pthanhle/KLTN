import React from 'react';
import { Plus, Network } from 'lucide-react';
import PageBreadcrumbs from '../../../../components/PageBreadcrumbs';

export const TestDriveHeader = ({ t, breadcrumbItems, onAddBooking, onOpenDispatch }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 w-full">
            <div>
                <PageBreadcrumbs items={breadcrumbItems} />
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mt-2">
                    {t('adminTestDriveBookings:page_title', 'Test Drive Bookings')}
                </h1>
                <p className="text-base text-slate-500 dark:text-slate-400 mt-2 hidden md:block">
                    {t('adminTestDriveBookings:page_subtitle', 'Manage test drive appointments and dispatch staff.')}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto shrink-0">
                <button
                    type="button"
                    onClick={onOpenDispatch}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-white dark:text-indigo-400 border border-transparent dark:border-indigo-500/50 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-indigo-600/20 dark:shadow-indigo-500/10 active:scale-95 transition-all outline-none w-full sm:w-auto shrink-0"
                >
                    <Network size={16} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                    {t('adminTestDriveBookings:smart_dispatch', 'Phân Công')}
                </button>
                <button
                    type="button"
                    onClick={onAddBooking}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none w-full sm:w-auto shrink-0"
                >
                    <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                    {t('adminTestDriveBookings:btn_create', 'Create Booking')}
                </button>
            </div>
        </div>
    );
};
