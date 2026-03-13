import React from 'react';

const TimeSlotSelector = ({ timeSlots, bookingData, updateBookingData, t }) => {
    return (
        <div className="mt-8 lg:mt-12">
            <h4 className="text-[18px] font-bold text-slate-900 dark:text-white mb-6">
                {t('services:available_time_slots', 'Available Time Slots')}
            </h4>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {timeSlots.map((slot, index) => {
                    const isSelected = bookingData.time_slot === slot;
                    const isRecommended = index === 0; // Just mock first slot as recommended
                    const isBooked = index === 2; // Mock third slot as booked

                    let btnClass = "relative flex flex-col items-center justify-center p-5 rounded-[20px] transition-all duration-300 border-2 ";
                    
                    if (isBooked) {
                        btnClass += "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60 ";
                    } else if (isSelected) {
                        btnClass += "bg-white dark:bg-yellow-500/5 border-yellow-500 text-slate-900 dark:text-white shadow-[0_15px_30px_rgba(234,179,8,0.15)] ";
                    } else {
                        btnClass += "bg-white dark:bg-[#141416] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20 shadow-sm ";
                    }

                    return (
                        <button
                            key={slot}
                            disabled={isBooked}
                            onClick={() => updateBookingData({ time_slot: slot })}
                            className={btnClass}
                        >
                            <span className="text-[15px] font-bold mb-1">{slot}</span>
                            
                            {isRecommended && !isBooked && (
                                <span className={`text-[9px] font-bold tracking-widest uppercase mt-1 ${isSelected ? 'text-yellow-600 dark:text-yellow-500' : 'text-yellow-500'}`}>
                                    {t('services:recommended', 'RECOMMENDED')}
                                </span>
                            )}
                            
                            {isBooked && (
                                <span className="text-[9px] font-bold tracking-widest uppercase mt-1 text-slate-400">
                                    {t('services:booked', 'BOOKED')}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TimeSlotSelector;
