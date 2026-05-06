import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

const AttendanceToolbar = ({ t, currentMonth, onMonthChange }) => {
    const handlePrevMonth = () => {
        onMonthChange(dayjs(currentMonth).subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        onMonthChange(dayjs(currentMonth).add(1, 'month'));
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full mb-8">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase mb-1">
                    {t('adminStaffAttendance:title', 'CHI TIẾT CHẤM CÔNG')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {t('adminStaffAttendance:subtitle', 'Employee Attendance Tracking & Performance Metrics')}
                </p>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                    onClick={handlePrevMonth}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm"
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="bg-white dark:bg-[#1c1c1e] rounded-full border border-slate-200 dark:border-white/5 flex items-center px-4 py-1.5 shadow-sm hover:shadow-md hover:border-yellow-500/50 transition-all cursor-pointer w-36 group">
                    <DatePicker 
                        picker="month" 
                        value={dayjs(currentMonth)}
                        onChange={onMonthChange}
                        allowClear={false}
                        bordered={false}
                        className="custom-dark-datepicker w-full !bg-transparent [&_input]:!text-center [&_input]:!font-bold [&_input]:!text-slate-700 dark:[&_input]:!text-white [&_input]:cursor-pointer [&_input]:!pl-0"
                        format="MM/YYYY"
                        suffixIcon={null}
                    />
                </div>

                <button 
                    onClick={handleNextMonth}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default AttendanceToolbar;
