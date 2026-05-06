import React from 'react';
import { Fingerprint, Smartphone, AlertTriangle } from 'lucide-react';
import StatusBadge from '../components/Table/StatusBadge';

const MethodIcon = ({ method }) => {
    if (!method) return null;
    if (method.toLowerCase().includes('faceid') || method.toLowerCase().includes('biometric')) {
        return <Fingerprint size={14} className="text-slate-400" />;
    }
    return <Smartphone size={14} className="text-slate-400" />;
};

export const getAttendanceColumns = (t) => [
    {
        title: t('adminStaffAttendance:col_date', 'Ngày'),
        dataIndex: 'date',
        key: 'date',
        width: 150,
        render: (date, record) => {
            const [year, month, day] = date.split('-');
            return (
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 dark:text-white">
                        {`${day}/${month}/${year}`}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {record.dayOfWeek}
                    </span>
                </div>
            );
        }
    },
    {
        title: t('adminStaffAttendance:col_shift', 'Ca làm'),
        dataIndex: 'shift',
        key: 'shift',
        width: 180,
        render: (shift) => (
            <span className="text-slate-600 dark:text-slate-300">{shift}</span>
        )
    },
    {
        title: t('adminStaffAttendance:col_clock_in', 'Giờ vào'),
        dataIndex: 'clockInTime',
        key: 'clockInTime',
        width: 120,
        render: (time, record) => {
            if (!time) return <span className="text-slate-400">--:--</span>;
            const isLate = record.status === 'LATE';
            return (
                <span className={`font-mono font-medium flex items-center gap-2 ${isLate ? 'text-yellow-600 dark:text-yellow-500' : 'text-slate-700 dark:text-slate-200'}`}>
                    {time}
                    {isLate && <AlertTriangle size={14} />}
                </span>
            );
        }
    },
    {
        title: t('adminStaffAttendance:col_clock_out', 'Giờ ra'),
        dataIndex: 'clockOutTime',
        key: 'clockOutTime',
        width: 120,
        render: (time) => {
            if (!time) return <span className="text-slate-400">--:--</span>;
            return <span className="font-mono font-medium text-slate-700 dark:text-slate-200">{time}</span>;
        }
    },
    {
        title: t('adminStaffAttendance:col_status', 'Trạng thái'),
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (status) => <StatusBadge status={status} t={t} />
    },
    {
        title: t('adminStaffAttendance:col_method', 'Phương thức'),
        dataIndex: 'method',
        key: 'method',
        width: 180,
        render: (method) => {
            if (!method) return <span className="text-slate-400">-</span>;
            return (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <MethodIcon method={method} />
                    <span className="text-sm">{method}</span>
                </div>
            );
        }
    },
    {
        title: t('adminStaffAttendance:col_notes', 'Ghi chú'),
        dataIndex: 'notes',
        key: 'notes',
        width: 250,
        render: (notes) => (
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-[200px] block" title={notes || ''}>
                {notes || '-'}
            </span>
        )
    }
];
