import { useState, useMemo } from 'react';

export const useCalendarLogic = (bookingData, updateBookingData) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const initialDate = bookingData.booking_date ? new Date(bookingData.booking_date) : today;
    const [viewYear, setViewYear] = useState(initialDate.getFullYear());
    const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(v => v + 1);
        } else {
            setViewMonth(v => v + 1);
        }
    };
    
    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(v => v - 1);
        } else {
            setViewMonth(v => v - 1);
        }
    };

    const handleDateClick = (dayObj) => {
        if (dayObj.timestamp < today.getTime()) return;
        
        // Output format: YYYY-MM-DD
        const clickedDate = new Date(dayObj.timestamp);
        // Correct timezone offset issue simply
        const year = clickedDate.getFullYear();
        const month = String(clickedDate.getMonth() + 1).padStart(2, '0');
        const date = String(clickedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${date}`;

        updateBookingData({ booking_date: formattedDate });
    };

    const daysInMonth = useMemo(() => {
        const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
        const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
        
        const startingDayOfWeek = firstDayOfMonth.getDay(); 
        const startOffset = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

        const days = [];
        const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
        
        // Previous month filler days
        for (let i = startOffset - 1; i >= 0; i--) {
            const date = new Date(viewYear, viewMonth - 1, prevMonthDays - i);
            days.push({
                date: date.getDate(),
                isCurrentMonth: false,
                timestamp: date.getTime(),
            });
        }

        // Current month days
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const date = new Date(viewYear, viewMonth, i);
            days.push({
                date: i,
                isCurrentMonth: true,
                timestamp: date.getTime(),
            });
        }

        // Next month filler days (to complete 42 cells / 6 rows)
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            const date = new Date(viewYear, viewMonth + 1, i);
            days.push({
                date: i,
                isCurrentMonth: false,
                timestamp: date.getTime(),
            });
        }

        return days;
    }, [viewYear, viewMonth]);

    const displayedMonthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

    return {
        viewYear,
        viewMonth,
        nextMonth,
        prevMonth,
        daysInMonth,
        handleDateClick,
        todayTime: today.getTime(),
        displayedMonthName
    };
};
