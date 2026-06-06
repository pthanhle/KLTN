import React from 'react';
import { CalendarOutlined } from '@ant-design/icons';

const TimeSlotSelector = ({ timeSlots, bookingData, updateBookingData, t }) => {
    const hasDate = !!bookingData.booking_date;

    return (
        <div className="mt-8 lg:mt-12">
            <h4 className="text-[18px] font-bold text-slate-900 dark:text-white mb-6">
                {t('services:available_time_slots', 'Các khung giờ trống')}
            </h4>

            {/* Hint banner when no date selected */}
            {!hasDate && (
                <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-2xl bg-yellow-500/8 border border-yellow-500/20">
                    <CalendarOutlined className="text-yellow-500 text-base shrink-0" />
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                        {t('services:select_date_first', 'Vui lòng chọn ngày trước khi chọn khung giờ.')}
                    </p>
                </div>
            )}

            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300 ${!hasDate ? 'opacity-40 pointer-events-none select-none' : ''}`}>
                {timeSlots.map((slotObj, index) => {
                    const slot = typeof slotObj === 'string' ? slotObj : slotObj.time_slot;
                    const isBooked = typeof slotObj === 'object' ? slotObj.isFull : false;
                    const currentCount = typeof slotObj === 'object' ? slotObj.currentCount : 0;
                    const maxCapacity = typeof slotObj === 'object' ? slotObj.maxCapacity : 5;

                    const isSelected = bookingData.time_slot === slot;
                    const isRecommended = index === 0;

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
                            type="button"
                            disabled={isBooked || !hasDate}
                            onClick={() => updateBookingData({ time_slot: slot })}
                            className={btnClass}
                        >
                            <span className="text-[15px] font-bold mb-1">{slot}</span>

                            {isRecommended && !isBooked && (
                                <span className={`text-[9px] font-bold tracking-widest uppercase mt-1 ${isSelected ? 'text-yellow-600 dark:text-yellow-500' : 'text-yellow-500'}`}>
                                    {t('services:recommended', 'ĐỀ XUẤT')}
                                </span>
                            )}

                            {isBooked && (
                                <span className="text-[9px] font-bold tracking-widest uppercase mt-1 text-slate-400">
                                    {t('services:booked', 'ĐÃ KÍN')}
                                </span>
                            )}

                            {!isBooked && typeof slotObj === 'object' && (
                                <span className="text-[9px] font-medium tracking-widest mt-1 text-slate-400">
                                    Còn {maxCapacity - currentCount} chỗ
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
