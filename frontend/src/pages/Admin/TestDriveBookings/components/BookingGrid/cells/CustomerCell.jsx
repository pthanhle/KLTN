import React from 'react';
import { User } from 'lucide-react';
import { Tooltip } from 'antd';

export const CustomerCell = ({ booking }) => {
    return (
        <div className="flex items-center space-x-4 min-w-0">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 flex-shrink-0 border border-slate-200 dark:border-white/5">
                <User size={20} />
            </div>
            <div className="min-w-0 flex-1">
                <Tooltip title={booking.fullName}>
                    <p className="font-bold text-slate-800 dark:text-white truncate cursor-default">{booking.fullName}</p>
                </Tooltip>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-wide truncate mt-0.5">{booking.phoneNumber}</p>
            </div>
        </div>
    );
};
