import React from 'react';
import BookingCard from '../BookingCard';
import { useTranslation } from 'react-i18next';
import { Inbox } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { Skeleton } from 'antd';

const IncomingBookingsPane = ({ bookings, isLoading }) => {
    const { t } = useTranslation('adminServiceReception');
    const { setNodeRef, isOver } = useDroppable({
        id: 'unassigned',
        data: {
            type: 'queue'
        }
    });

    return (
        <section 
            ref={setNodeRef}
            className={`w-[30%] min-w-[320px] bg-white dark:bg-[#141416] flex flex-col border-r border-slate-200 dark:border-white/5 shadow-xl dark:shadow-[30px_0_60px_rgba(0,0,0,0.3)] z-10 relative transition-colors ${isOver ? 'bg-slate-50 dark:bg-[#1c1c1e]' : ''}`}
        >
            <div className="p-6 pb-2">
                <h3 className="text-xs uppercase tracking-[0.1em] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    {t('incomingPane_title', 'Incoming Queue')}
                    <span className="bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full text-[10px]">
                        {bookings.length} {t('incomingPane_waiting', 'WAITING')}
                    </span>
                </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 w-full shadow-sm border border-slate-100 dark:border-white/5">
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))
                ) : bookings.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500/50 dark:text-slate-400/50">
                        <Inbox className="w-10 h-10 mb-2" />
                        <p className="text-sm">{t('incomingPane_empty', 'No pending bookings')}</p>
                    </div>
                ) : (
                    bookings.map(booking => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))
                )}
            </div>
        </section>
    );
};

export default IncomingBookingsPane;
