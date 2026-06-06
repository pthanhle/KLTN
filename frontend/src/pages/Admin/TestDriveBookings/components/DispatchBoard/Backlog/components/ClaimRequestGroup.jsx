import React, { useState } from 'react';
import { Avatar, Popover } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

export const ClaimRequestGroup = ({ requestedStaff, label, onAssignStaff }) => {
    const [open, setOpen] = useState(false);

    if (!requestedStaff || requestedStaff.length === 0) return null;

    const visibleStaff = requestedStaff.slice(0, 3);
    const extraCount = requestedStaff.length - 3;

    const popoverContent = (
        <div style={{ width: 224 }} className="space-y-2 py-1">
            {requestedStaff.map(staff => (
                <div key={staff._id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <Avatar src={staff.avatarUrl} size="small" style={{ flexShrink: 0 }}>
                            {staff.fullName?.charAt(0)}
                        </Avatar>
                        <span className="text-sm font-medium text-slate-800 dark:text-white truncate">
                            {staff.fullName}
                        </span>
                    </div>
                    {onAssignStaff && (
                        <button
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                                onAssignStaff(staff);
                            }}
                            className="shrink-0 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-900 transition-colors"
                        >
                            <UserAddOutlined style={{ fontSize: 11 }} />
                            Phân công
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div
            className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10"
            onPointerDown={(e) => e.stopPropagation()}
        >
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {label}
            </span>

            <Popover
                content={popoverContent}
                title={<span className="font-semibold text-sm">Nhân viên yêu cầu</span>}
                trigger="click"
                open={open}
                onOpenChange={setOpen}
                placement="bottomRight"
                overlayInnerStyle={{ borderRadius: 12, padding: '8px 12px' }}
            >
                {/* Plain div as trigger — Avatar.Group+Tooltip nesting breaks Popover click detection */}
                <div
                    className="flex items-center cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                >
                    {visibleStaff.map((staff, i) => (
                        <Avatar
                            key={staff._id}
                            src={staff.avatarUrl}
                            size="small"
                            style={{
                                border: '2px solid white',
                                marginLeft: i > 0 ? -8 : 0,
                                zIndex: visibleStaff.length - i,
                            }}
                        >
                            {staff.fullName?.charAt(0)}
                        </Avatar>
                    ))}
                    {extraCount > 0 && (
                        <Avatar
                            size="small"
                            style={{
                                marginLeft: -8,
                                backgroundColor: '#fde3cf',
                                color: '#f56a00',
                                fontSize: 10,
                                fontWeight: 700,
                            }}
                        >
                            +{extraCount}
                        </Avatar>
                    )}
                </div>
            </Popover>
        </div>
    );
};
