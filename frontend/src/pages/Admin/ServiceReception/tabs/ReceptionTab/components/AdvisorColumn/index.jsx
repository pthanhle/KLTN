import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Image, Skeleton } from 'antd';
import BookingCard from '../BookingCard';
import { RECEPTION_CONSTANTS } from '../../../../constants/receptionConstants';

const AdvisorColumn = ({ advisor, assignedBookings, isLoading, onReschedule, onNoShow }) => {
    const { t } = useTranslation('adminServiceReception');
    const { setNodeRef, isOver } = useDroppable({
        id: advisor ? advisor._id : 'loading',
        data: {
            type: 'advisor',
            advisor
        }
    });

    if (isLoading) {
        return (
            <div className="min-w-[350px] w-[350px] flex flex-col h-full bg-surface/50 rounded-xl border border-outline-variant/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden opacity-70">
                <div className="p-5 bg-surface border-b border-outline-variant/10 flex justify-between items-center shadow-md">
                    <Skeleton avatar active paragraph={{ rows: 1 }} />
                </div>
                <div className="flex-1 p-5 space-y-4">
                    <Skeleton.Button active style={{ width: '100%', height: 112 }} shape="round" />
                    <Skeleton.Button active style={{ width: '100%', height: 112 }} shape="round" />
                    <Skeleton.Button active style={{ width: '100%', height: 128 }} shape="round" />
                </div>
            </div>
        );
    }

    const maxWorkload = RECEPTION_CONSTANTS.MAX_SA_WORKLOAD;
    const currentWorkload = assignedBookings.length;
    const workloadPercentage = Math.min((currentWorkload / maxWorkload) * 100, 100);

    return (
        <div className={`min-w-[350px] w-[350px] flex flex-col h-full bg-white/50 dark:bg-[#141416]/50 rounded-xl border ${isOver ? 'border-yellow-500' : 'border-slate-200 dark:border-white/5'} shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden transition-colors`}>
            {/* Column Header */}
            <div className="p-5 bg-white dark:bg-[#141416] border-b border-slate-200 dark:border-white/5 flex justify-between items-center shadow-md z-10 relative">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1c1c1e] border-2 border-yellow-500/50 overflow-hidden shadow-inner flex items-center justify-center">
                        <Image
                            src={advisor.avatarUrl}
                            alt={advisor.fullName}
                            className="w-full h-full object-cover rounded-full"
                            preview={false}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{advisor.fullName}</h4>
                        <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-slate-500 dark:text-slate-400">
                            {t(`role_${advisor.role}`, advisor.role.replace('_', ' '))}
                        </span>
                    </div>
                </div>

                {/* Circular Progress Indicator */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                            className="text-slate-200 dark:text-white/10 stroke-current"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3"
                        />
                        <path
                            className={`${currentWorkload >= maxWorkload ? 'text-red-500' : 'text-yellow-500'} stroke-current transition-all duration-500`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeDasharray={`${workloadPercentage}, 100`}
                            strokeWidth="3"
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-slate-900 dark:text-slate-100">
                        {currentWorkload}/{maxWorkload}
                    </span>
                </div>
            </div>

            <div
                ref={setNodeRef}
                className={`flex-1 p-5 overflow-y-auto space-y-4 ${isOver ? 'bg-slate-100/50 dark:bg-[#101014]/50' : ''}`}
            >
                {assignedBookings.map(booking => (
                    <BookingCard key={booking._id} booking={booking} onReschedule={onReschedule} onNoShow={onNoShow} />
                ))}

                <div className={`border-2 border-dashed ${isOver ? 'border-yellow-500 bg-yellow-500/10' : 'border-slate-300 dark:border-white/10 bg-slate-100/30 dark:bg-[#101014]/30'} rounded-xl h-32 flex items-center justify-center hover:bg-slate-100/80 dark:hover:bg-[#101014]/80 hover:border-yellow-500/50 transition-all group shadow-inner`}>
                    <span className={`text-sm font-bold ${isOver ? 'text-yellow-500' : 'text-slate-500/50 dark:text-slate-400/50'} uppercase tracking-wider group-hover:text-yellow-500 transition-colors flex items-center gap-2`}>
                        <Plus className="w-5 h-5" />
                        {t('advisorColumn_dropHere', 'Drop Booking Here')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdvisorColumn;
