import React from 'react';
import { Plus } from 'lucide-react';
import { Tooltip, Avatar } from 'antd';

export const AssigneeCell = ({ booking, t, onOpenDispatch }) => {
    return (
        <div className="flex items-center justify-start md:justify-center mt-4 md:mt-0 pt-4 md:pt-0 border-t border-slate-100 dark:border-white/10 md:border-t-0 space-x-3 md:space-x-0">
            <span className="md:hidden text-xs uppercase tracking-widest text-slate-500 font-bold w-24">{t('adminTestDriveBookings:col_assignee', 'Phụ Trách')}:</span>
            {booking.assignedStaff ? (
                <div className="flex items-center space-x-2 md:justify-center w-full">
                    <Tooltip title={booking.assignedStaff.name} placement="topRight">
                        {booking.assignedStaff.avatar ? (
                            <Avatar src={booking.assignedStaff.avatar} className="w-8 h-8 border border-slate-200 dark:border-white/10" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 flex-shrink-0 cursor-pointer hover:bg-slate-200 transition-colors">
                                {booking.assignedStaff.name.substring(0, 2).toUpperCase()}
                            </div>
                        )}
                    </Tooltip>
                    <span className="md:hidden text-sm font-semibold text-slate-700 dark:text-slate-300">{booking.assignedStaff.name}</span>
                </div>
            ) : (
                <Tooltip title={t('adminTestDriveBookings:tooltip_assign', 'Giao Việc')} placement="topRight">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            if(onOpenDispatch) onOpenDispatch();
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500 hover:text-slate-900 transition-colors border border-yellow-500/20"
                    >
                        <Plus size={16} />
                    </button>
                </Tooltip>
            )}
        </div>
    );
};
