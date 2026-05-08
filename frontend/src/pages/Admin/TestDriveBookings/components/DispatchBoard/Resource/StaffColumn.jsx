import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Avatar } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import TaskCard from '../../../../Shared/components/TaskCard';
import { useStaffColumnLogic } from './hooks/useStaffColumnLogic';

const StaffColumn = ({ staff, t, onTaskClick, filterDate }) => {
    const {
        isOver,
        setNodeRef,
        currentTasks,
        workloadCount,
        workloadColor
    } = useStaffColumnLogic(staff, filterDate);

    return (
        <div
            ref={setNodeRef}
            className={`w-[320px] shrink-0 flex flex-col h-full bg-slate-50 dark:bg-[#0a0a0a] rounded-2xl border ${isOver ? 'border-yellow-500 shadow-lg' : 'border-slate-200 dark:border-white/10 shadow-sm'
                } transition-all duration-300 overflow-hidden relative`}
        >
            <div className="p-5 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-transparent">
                <div className="flex items-center gap-4">
                    <Avatar
                        src={staff.avatarUrl}
                        size={48}
                        className="border-2 border-white dark:border-[#141416] shadow-sm shrink-0"
                    >
                        {staff.fullName?.charAt(0)}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 dark:text-white truncate">{staff.fullName}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {staff.role === 'SALES_EXECUTIVE' ? t('adminTestDriveBookings:role_sales_executive', 'Nhân Viên Kinh Doanh') : staff.role}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {t('adminTestDriveBookings:workload_label', 'Workload')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${workloadColor}`}>
                        {workloadCount === 0
                            ? t('adminTestDriveBookings:workload_empty', 'Trống')
                            : `${t('adminTestDriveBookings:workload_processing', 'Đang xử lý:')} ${workloadCount}`}
                    </span>
                </div>
            </div>

            <div className={`flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 transition-colors ${isOver ? 'bg-yellow-500/5 dark:bg-yellow-500/5' : 'bg-transparent'
                }`}>
                {currentTasks.length > 0 ? (
                    currentTasks.map(task => (
                        <TaskCard key={task.id} task={task} status="PENDING" onClick={() => onTaskClick(task)} />
                    ))
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-70">
                        <div className="w-20 h-20 rounded-full bg-white dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-sm">
                            <InboxOutlined className="text-[28px] text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                            {t('adminTestDriveBookings:drag_drop_hint', 'Kéo thả lịch vào đây')}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            {t('adminTestDriveBookings:staff_available', 'Nhân viên đang rảnh')}
                        </p>
                    </div>
                )}
            </div>

            {isOver && (
                <div className="absolute inset-0 bg-yellow-500/10 pointer-events-none rounded-3xl border-2 border-yellow-500" />
            )}
        </div>
    );
};

export default StaffColumn;
