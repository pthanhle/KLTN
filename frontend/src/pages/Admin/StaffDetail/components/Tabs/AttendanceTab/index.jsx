import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAttendanceData } from './hooks/useAttendanceData';
import AttendanceToolbar from './components/Toolbar/AttendanceToolbar';
import AttendanceStatGrid from './components/StatCards/AttendanceStatGrid';
import AttendanceTable from './components/Table/AttendanceTable';

const AttendanceTab = ({ staff }) => {
    const { t } = useTranslation();
    const {
        summary,
        logs,
        isLoading,
        currentMonth,
        handleMonthChange
    } = useAttendanceData(staff?._id);

    return (
        <div className="flex flex-col w-full animate-fade-in">
            <AttendanceToolbar
                t={t}
                currentMonth={currentMonth}
                onMonthChange={handleMonthChange}
            />

            <AttendanceStatGrid
                summary={summary}
                isLoading={isLoading}
                t={t}
            />

            <AttendanceTable
                logs={logs}
                isLoading={isLoading}
                t={t}
            />

            <div className="mt-8 p-6 bg-[#1a1c23] dark:bg-[#141416] rounded-xl border border-slate-700/50 dark:border-white/5 relative overflow-hidden flex items-center justify-between">
                <div className="relative z-10">
                    <span className="font-bold text-xs uppercase tracking-widest text-yellow-500 mb-1 block">System Notice</span>
                    <h4 className="text-lg font-bold text-white mb-1">Attendance Sync Active</h4>
                    <p className="text-slate-400 text-sm">Biometric terminals at Service Bay 1 & 2 are currently online and syncing.</p>
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-yellow-500/10 to-transparent z-0"></div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-white/5 rounded-full z-0"></div>
                <div className="absolute right-10 top-10 w-20 h-20 border border-white/5 rounded-full z-0"></div>
            </div>
        </div>
    );
};

export default AttendanceTab;
