import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';
import { Popconfirm } from 'antd';
import ROBlock from './ROBlock';

const BayRow = ({ bay, assignedBookings, technicians, adjustDuration, activeBooking, selectedDateStr, onDelete }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: bay.id,
        data: { type: 'bay', bay }
    });

    const hasConflict = false; // one-car-per-bay is enforced at drop time
    const isHighlighted = !!activeBooking;

    return (
        <div className={`flex bg-white dark:bg-[#0a0a0b] min-h-[140px] border-b border-slate-200 dark:border-white/10 group relative transition-opacity duration-300 ${isHighlighted ? 'ring-2 ring-inset ring-yellow-500/50 z-10' : ''}`}>
            <div className="w-80 shrink-0 bg-slate-50 dark:bg-[#141416] p-5 flex flex-col justify-center border-r border-slate-200 dark:border-white/10 z-20 relative sticky left-0 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-800 dark:text-yellow-500 font-black tracking-widest uppercase">
                        {bay.name}
                    </span>
                    {onDelete && (
                        <Popconfirm
                            title="Xoá khoang này?"
                            description="Hành động này không thể hoàn tác."
                            onConfirm={onDelete}
                            okText="Xoá"
                            cancelText="Huỷ"
                            okButtonProps={{ danger: true }}
                        >
                            <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </Popconfirm>
                    )}
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
                            selectedDateStr={selectedDateStr}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BayRow;
