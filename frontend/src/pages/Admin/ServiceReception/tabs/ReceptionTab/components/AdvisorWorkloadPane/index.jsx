import React from 'react';
import AdvisorColumn from '../AdvisorColumn';

const AdvisorWorkloadPane = ({ advisors, bookings, isLoading, onReschedule, onNoShow, onViewDetail }) => {
    return (
        <section className="flex-1 bg-slate-50 dark:bg-[#0a0a0b] overflow-x-auto overflow-y-hidden p-8 flex gap-8">
            {isLoading ? (
                // Skeletons
                Array.from({ length: 4 }).map((_, idx) => (
                    <AdvisorColumn key={idx} isLoading={true} />
                ))
            ) : (
                advisors.map(advisor => {
                    const assignedBookings = bookings.filter(b => {
                        const bAdvisorId = b.advisor_id ? (b.advisor_id._id || b.advisor_id).toString() : null;
                        return bAdvisorId === advisor._id.toString();
                    });
                    return (
                        <AdvisorColumn
                            key={advisor._id}
                            advisor={advisor}
                            assignedBookings={assignedBookings}
                            isLoading={false}
                            onReschedule={onReschedule}
                            onNoShow={onNoShow}
                            onViewDetail={onViewDetail}
                        />
                    );
                })
            )}
        </section>
    );
};

export default AdvisorWorkloadPane;
