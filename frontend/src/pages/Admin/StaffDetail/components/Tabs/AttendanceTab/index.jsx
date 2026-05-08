import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAttendanceData } from './hooks/useAttendanceData';
import AttendanceToolbar from './components/Toolbar/AttendanceToolbar';
import AttendanceStatGrid from './components/StatCards/AttendanceStatGrid';
import AttendanceTable from './components/Table/AttendanceTable';
import SystemNotice from './components/SystemNotice';

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

            <SystemNotice t={t} />
        </div>
    );
};

export default AttendanceTab;
