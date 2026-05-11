import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInboxLogic } from './hooks/useInboxLogic';
import InboxSkeleton from './components/InboxSkeleton';
import InboxTable from './components/InboxTable';

const InboxTab = () => {
    const { t } = useTranslation('adminServiceReception');
    const { bookings, isLoading, confirmBooking } = useInboxLogic();

    return (
        <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">

            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                {isLoading ? (
                    <InboxSkeleton />
                ) : (
                    <InboxTable bookings={bookings} onConfirm={confirmBooking} />
                )}
            </div>
        </div>
    );
};

export default InboxTab;
