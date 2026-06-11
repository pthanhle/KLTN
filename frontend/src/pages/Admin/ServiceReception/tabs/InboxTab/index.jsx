import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInboxLogic } from './hooks/useInboxLogic';
import InboxSkeleton from './components/InboxSkeleton';
import InboxTable from './components/InboxTable';
import ConfirmModal from '../../../../../components/ui/ConfirmModal';

const InboxTab = () => {
    const { t } = useTranslation('adminServiceReception');
    const { 
        bookings, 
        isLoading, 
        confirmBooking, 
        confirmReject,
        handleRejectConfirm,
        handleRejectCancel,
        bookingToReject,
        confirmingId
    } = useInboxLogic();

    return (
        <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">

            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                {isLoading ? (
                    <InboxSkeleton />
                ) : (
                    <InboxTable bookings={bookings} onConfirm={confirmBooking} onReject={confirmReject} confirmingId={confirmingId} />
                )}
            </div>

            <ConfirmModal 
                isOpen={!!bookingToReject}
                onClose={handleRejectCancel}
                onConfirm={handleRejectConfirm}
                title={t('modal_reject_title', 'Từ chối lịch hẹn?')}
                description={t('modal_reject_desc', 'Bạn có chắc chắn muốn từ chối lịch hẹn này? Hành động này không thể hoàn tác.')}
                confirmText={t('action_reject', 'Từ chối')}
                cancelText={t('modal_reschedule_btn_cancel', 'Hủy')}
                iconType="trash"
            />
        </div>
    );
};

export default InboxTab;
