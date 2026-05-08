import React from 'react';
import { Avatar, Tooltip } from 'antd';

export const ClaimRequestGroup = ({ requestedStaff, label }) => {
    if (!requestedStaff || requestedStaff.length === 0) return null;

    return (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {label}
            </span>
            <Avatar.Group max={{ count: 3, style: { color: '#f56a00', backgroundColor: '#fde3cf' } }} size="small">
                {requestedStaff.map(staff => (
                    <Tooltip key={staff._id} title={staff.fullName} placement="top">
                        <Avatar src={staff.avatarUrl} style={{ cursor: 'pointer', border: '2px solid white' }}>
                            {staff.fullName.charAt(0)}
                        </Avatar>
                    </Tooltip>
                ))}
            </Avatar.Group>
        </div>
    );
};
