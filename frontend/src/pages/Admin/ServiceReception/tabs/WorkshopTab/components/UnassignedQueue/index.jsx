import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import QueueCard from './QueueCard';

const UnassignedQueue = ({ bookings }) => {
    const { t } = useTranslation('adminServiceReception');
    const { setNodeRef, isOver } = useDroppable({
        id: 'unassigned_pool',
        data: { type: 'unassigned_pool' }
    });

    return (
        <div className="w-80 h-full flex flex-col bg-white dark:bg-[#141416] rounded-xl border border-slate-200 dark:border-white/5 shadow-lg overflow-hidden ml-4">
            <div className="p-4 bg-slate-50 dark:bg-[#0a0a0b] border-b border-slate-200 dark:border-white/10 z-10 flex items-center justify-between">
                <h3 className="font-black tracking-widest text-sm text-slate-800 dark:text-yellow-500 uppercase">
                    {t('unassigned_queue_title', 'CHỜ PHÂN CÔNG')}
                </h3>
                <span className="bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {bookings.length}
                </span>
            </div>

            <div 
                ref={setNodeRef}
                className={`flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 transition-colors ${
                    isOver ? 'bg-slate-100 dark:bg-[#1c1c1e]' : ''
                }`}
            >
                {bookings.length === 0 ? (
                    <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {t('queue_empty', 'Không có lịch hẹn')}
                        </span>
                    </div>
                ) : (
                    bookings.map(booking => (
                        <QueueCard key={booking._id} booking={booking} />
                    ))
                )}
            </div>
        </div>
    );
};

export default UnassignedQueue;
