import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { generateMockAttendanceForStaff } from '../data/mockAttendanceData';

export const useAttendanceData = (staffId) => {
    const [summary, setSummary] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(dayjs()); // default to current month

    useEffect(() => {
        if (!staffId) return;

        let isMounted = true;
        setIsLoading(true);
        
        // Mô phỏng gọi API thực tế với staffId và monthYear
        const monthYearStr = currentMonth.format('YYYY-MM');
        
        setTimeout(() => {
            if (isMounted) {
                const data = generateMockAttendanceForStaff(staffId, monthYearStr);
                setSummary(data.summary);
                
                // Tiền xử lý (Transform) DB Schema thành dạng DTO cho View (UI)
                // Đây là tư duy của Senior FE: Tách biệt hoàn toàn DB Layer và UI Layer
                const transformedLogs = data.logs.map(log => {
                    const logDate = dayjs(log.date);
                    // Lấy thứ trong tuần (0 = Chủ Nhật, 1 = Thứ Hai,...)
                    const daysOfWeekMap = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
                    const dayOfWeek = daysOfWeekMap[logDate.day()];
                    
                    return {
                        ...log,
                        dayOfWeek: dayOfWeek,
                        shift: log.shiftName,
                        // Format ISO datetime thành giờ (VD: 07:55)
                        clockInTime: log.clockIn ? dayjs(log.clockIn).format('HH:mm') : null,
                        clockOutTime: log.clockOut ? dayjs(log.clockOut).format('HH:mm') : null
                    };
                });
                
                setLogs(transformedLogs);
                setIsLoading(false);
            }
        }, 600); // Fake network delay

        return () => {
            isMounted = false;
        };
    }, [staffId, currentMonth]);

    const handleMonthChange = (date) => {
        if (date) {
            setCurrentMonth(date);
        }
    };

    return {
        summary,
        logs,
        isLoading,
        currentMonth,
        handleMonthChange
    };
};
