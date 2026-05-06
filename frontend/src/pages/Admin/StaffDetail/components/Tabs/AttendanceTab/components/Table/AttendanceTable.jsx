import React from 'react';
import { Table, Skeleton } from 'antd';
import { Download } from 'lucide-react';
import { getAttendanceColumns } from '../../constants/attendanceColumns';

const AttendanceTable = ({ logs, isLoading, t }) => {
    const columns = getAttendanceColumns(t);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-[#141416] rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                <Skeleton active paragraph={{ rows: 6 }} />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.02]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-white">
                    {t('adminStaffAttendance:table_title', 'Nhật ký chấm công (Attendance Log)')}
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1c1c1e] rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-sm">
                    <Download size={14} />
                    {t('adminStaffAttendance:btn_export', 'Export')}
                </button>
            </div>
            
            <div className="overflow-x-auto w-full">
                <Table 
                    columns={columns}
                    dataSource={logs}
                    rowKey="_id"
                    pagination={false}
                    rowClassName={() => "group/row transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]"}
                    className="
                        custom-dark-table w-full 
                        [&_.ant-table]:!bg-transparent 
                        
                        /* Header */
                        [&_.ant-table-thead>tr>th]:!bg-slate-50 
                        dark:[&_.ant-table-thead>tr>th]:!bg-[#141416]
                        [&_.ant-table-thead>tr>th]:!border-b 
                        [&_.ant-table-thead>tr>th]:!border-slate-200 
                        dark:[&_.ant-table-thead>tr>th]:!border-white/5 
                        [&_.ant-table-thead>tr>th]:!text-xs
                        [&_.ant-table-thead>tr>th]:!uppercase
                        [&_.ant-table-thead>tr>th]:!tracking-widest
                        [&_.ant-table-thead>tr>th]:!text-slate-500
                        
                        /* Body */
                        [&_.ant-table-tbody>tr>td]:!border-b 
                        [&_.ant-table-tbody>tr>td]:!border-slate-100 
                        dark:[&_.ant-table-tbody>tr>td]:!border-white/5 
                        
                        /* Padding Adjustments */
                        [&_.ant-table-thead>tr>th:first-child]:!pl-6
                        [&_.ant-table-tbody>tr>td:first-child]:!pl-6
                        [&_.ant-table-thead>tr>th:last-child]:!pr-6
                        [&_.ant-table-tbody>tr>td:last-child]:!pr-6
                    "
                />
            </div>
        </div>
    );
};

export default AttendanceTable;
