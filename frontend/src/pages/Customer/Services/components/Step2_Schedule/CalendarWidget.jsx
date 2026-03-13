import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendarLogic } from '../../hooks/useCalendarLogic';

const CalendarWidget = ({ bookingData, updateBookingData }) => {
    const { 
        daysInMonth, 
        nextMonth, 
        prevMonth, 
        handleDateClick, 
        todayTime,
        displayedMonthName
    } = useCalendarLogic(bookingData, updateBookingData);

    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const getSelectedTimestamp = () => {
        if (!bookingData.booking_date) return null;
        const [year, month, date] = bookingData.booking_date.split('-');
        return new Date(year, month - 1, date).getTime();
    };

    const selectedTimestamp = getSelectedTimestamp();

    return (
        <div className="w-full bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-[28px] p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="text-yellow-500" size={24} />
                    <h3 className="text-[20px] font-black tracking-tight text-slate-900 dark:text-white capitalize">
                        {displayedMonthName}
                    </h3>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={prevMonth}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-400"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextMonth}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-400"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-4">
                {weekDays.map(day => (
                    <div key={day} className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                        {day}
                    </div>
                ))}

                {/* Days Grid */}
                {daysInMonth.map((dayObj, idx) => {
                    const isPast = dayObj.timestamp < todayTime;
                    const isSelected = selectedTimestamp === dayObj.timestamp;
                    
                    let btnClass = "w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-sm font-bold transition-all ";
                    
                    if (!dayObj.isCurrentMonth) {
                        btnClass += "text-slate-300 dark:text-slate-600 opacity-50 ";
                    } else if (isPast) {
                        btnClass += "text-slate-300 dark:text-slate-700 cursor-not-allowed ";
                    } else if (isSelected) {
                        btnClass += "bg-yellow-50 border-2 border-yellow-500 text-yellow-600 dark:bg-yellow-500 dark:text-[#0a0a0b] shadow-[0_10px_20px_rgba(234,179,8,0.2)] dark:shadow-none ";
                    } else {
                        btnClass += "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 ";
                    }

                    return (
                        <button
                            key={idx}
                            disabled={isPast}
                            onClick={() => handleDateClick(dayObj)}
                            className={btnClass}
                        >
                            {dayObj.date}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarWidget;
