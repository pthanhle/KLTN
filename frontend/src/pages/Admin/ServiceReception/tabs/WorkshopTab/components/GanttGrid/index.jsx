import React from 'react';
import GanttHeader from './GanttHeader';
import BayRow from './BayRow';

const GanttGrid = ({ bays, bookings, technicians, adjustDuration, activeBooking, selectedDateStr, onDeleteBay }) => {
    if (bays.length === 0) {
        return (
            <div className="bg-white dark:bg-[#0a0a0b] rounded-xl shadow-xl border border-slate-200 dark:border-white/10 flex items-center justify-center min-h-[200px]">
                <div className="text-center text-slate-400 dark:text-slate-500 py-12">
                    <p className="text-sm font-medium">Chưa có khoang sửa chữa nào</p>
                    <p className="text-xs mt-1">Nhấn "Thêm khoang" để tạo khoang sửa chữa đầu tiên</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#0a0a0b] rounded-xl shadow-xl overflow-x-auto border border-slate-200 dark:border-white/10 relative">
            <div className="min-w-[1200px]">
                <GanttHeader />

                {bays.map((bay) => {
                    const assignedBookings = bookings.filter(b => b.bay_id === bay.id);

                    return (
                        <BayRow
                            key={bay.id}
                            bay={bay}
                            assignedBookings={assignedBookings}
                            technicians={technicians}
                            adjustDuration={adjustDuration}
                            activeBooking={activeBooking}
                            selectedDateStr={selectedDateStr}
                            onDelete={assignedBookings.length === 0 ? () => onDeleteBay(bay.id, bay.name) : null}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GanttGrid;
