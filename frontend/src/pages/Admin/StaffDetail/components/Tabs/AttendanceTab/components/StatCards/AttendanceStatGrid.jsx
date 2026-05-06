import React from 'react';
import { CalendarCheck, Clock4, Timer, Activity } from 'lucide-react';
import StatCard from './StatCard';

const AttendanceStatGrid = ({ summary, isLoading, t }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full mb-8">
            <StatCard 
                title={t('adminStaffAttendance:stat_work_days', 'Ngày công thực tế')}
                value={summary?.totalWorkDays || 0}
                subValue={`/${summary?.targetDays || 0}`}
                icon={CalendarCheck}
                colorClass="text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                bgGlowClass="bg-emerald-500/10"
                isLoading={isLoading}
            />
            <StatCard 
                title={t('adminStaffAttendance:stat_late_days', 'Số ngày đi trễ')}
                value={summary?.lateDays || 0}
                icon={Clock4}
                colorClass={summary?.lateDays > 0 ? "text-rose-500 bg-rose-500/10 border-rose-500/20" : "text-slate-500 bg-slate-500/10 border-slate-500/20"}
                bgGlowClass={summary?.lateDays > 0 ? "bg-rose-500/10" : "bg-slate-500/10"}
                isLoading={isLoading}
            />
            <StatCard 
                title={t('adminStaffAttendance:stat_overtime', 'Giờ tăng ca')}
                value={summary?.overtimeHours || 0}
                subValue="h"
                icon={Timer}
                colorClass="text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                bgGlowClass="bg-yellow-500/10"
                isLoading={isLoading}
            />
            <StatCard 
                title={t('adminStaffAttendance:stat_score', 'Điểm chuyên cần')}
                value={`${summary?.attendanceScore || 0}%`}
                icon={Activity}
                colorClass="text-blue-500 bg-blue-500/10 border-blue-500/20"
                bgGlowClass="bg-blue-500/10"
                isLoading={isLoading}
            />
        </div>
    );
};

export default AttendanceStatGrid;
