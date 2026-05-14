import React from 'react';
import GanttHeader from './GanttHeader';
import BayRow from './BayRow';

const GanttGrid = ({ bays, bookings, technicians, adjustDuration, activeBooking, selectedDateStr }) => {
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
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GanttGrid;
