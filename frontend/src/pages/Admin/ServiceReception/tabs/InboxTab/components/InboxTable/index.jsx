import React from 'react';
import { useTranslation } from 'react-i18next';
import InboxTableRow from './InboxTableRow';
import { Inbox } from 'lucide-react';

const InboxTable = ({ bookings, onConfirm, onReject }) => {
    const { t } = useTranslation('adminServiceReception');

    if (!bookings || bookings.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 dark:text-slate-500 bg-white dark:bg-[#0a0a0b] rounded-xl border border-slate-200 dark:border-white/10">
                <Inbox size={48} className="mb-4 opacity-50" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('inbox_empty_title', 'No Pending Requests')}
                </h3>
                <p className="text-sm text-center max-w-sm">
                    {t('inbox_empty_desc', 'You have caught up with all incoming booking requests. Great job!')}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full flex-1 flex flex-col bg-white dark:bg-[#0a0a0b] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:flex px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-bold">
                <div className="w-[10%]">{t('inbox_col_aging', 'Aging')}</div>
                <div className="w-[20%] pr-4">{t('inbox_col_customer', 'Customer')}</div>
                <div className="w-[20%] pr-4">{t('inbox_col_vehicle', 'Vehicle')}</div>
                <div className="w-[30%] pr-4">{t('inbox_col_details', 'Request Details')}</div>
                <div className="w-[20%] text-right">{t('inbox_col_actions', 'Actions')}</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {bookings.map((booking) => (
                    <InboxTableRow 
                        key={booking._id} 
                        booking={booking} 
                        onConfirm={onConfirm} 
                        onReject={onReject}
                    />
                ))}
            </div>
        </div>
    );
};

export default InboxTable;
