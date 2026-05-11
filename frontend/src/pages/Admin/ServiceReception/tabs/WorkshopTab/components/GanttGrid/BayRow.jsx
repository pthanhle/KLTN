import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';
import ROBlock from './ROBlock';

const BayRow = ({ bay, assignedBookings, technicians, adjustDuration, activeBooking }) => {
    const { t } = useTranslation('adminServiceReception');

    const { setNodeRef, isOver } = useDroppable({
        id: bay.id,
        data: {
            type: 'bay',
            bay
        }
    });

    const hasConflict = assignedBookings.length > 1;

    const totalAssignedHours = assignedBookings.reduce((total, booking) => {
        const timeParts = booking.time_slot.split(' - ');
        if (timeParts.length === 2) {
            const start = timeParts[0].split(':').map(Number);
            const end = timeParts[1].split(':').map(Number);
            return total + ((end[0] + end[1] / 60) - (start[0] + start[1] / 60));
        }
        return total;
    }, 0);
    const utilization = Math.min((totalAssignedHours / 12) * 100, 100).toFixed(0);

    let isDimmed = false;
    let isHighlighted = false;

    if (activeBooking) {
        isHighlighted = true;
    }

    return (
        <div className={`flex bg-white dark:bg-[#0a0a0b] min-h-[140px] border-b border-slate-200 dark:border-white/10 group relative transition-opacity duration-300 ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100'} ${isHighlighted ? 'ring-2 ring-inset ring-yellow-500/50 z-10' : ''}`}>
            <div className="w-80 shrink-0 bg-slate-50 dark:bg-[#141416] p-5 flex flex-col justify-center border-r border-slate-200 dark:border-white/10 z-20 relative sticky left-0 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-800 dark:text-yellow-500 font-black tracking-widest uppercase">
                        {t(`bay_id_${bay.id.split('_')[1]}`, bay.bay_id)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold mt-auto mb-1">
                    <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('utilization', 'Bay Utilization')}</span>
                    <span className={`${utilization > 80 ? 'text-red-500' : 'text-emerald-500'}`}>{utilization}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${utilization > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${utilization}%` }}
                    ></div>
                </div>
            </div>

            <div
                ref={setNodeRef}
                className={`flex-1 flex relative transition-colors duration-300 ${isOver ? 'bg-slate-100 dark:bg-[#1c1c1e]' : ''} ${isHighlighted ? 'bg-yellow-50/10 dark:bg-yellow-900/10' : ''}`}
            >
                {[...Array(13)].map((_, i) => (
                    <div key={i} className="flex-1 border-l border-dashed border-slate-200 dark:border-white/10 opacity-50 pointer-events-none"></div>
                ))}

                {assignedBookings.map((booking, idx) => {
                    const isConflict = hasConflict && idx === 1;
                    return (
                        <ROBlock
                            key={booking._id}
                            booking={booking}
                            isConflict={isConflict}
                            technicians={technicians}
                            adjustDuration={adjustDuration}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BayRow;
