import React, { useState } from 'react';
import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import { Settings, Wrench, Tag, ShoppingBag, Calendar, ArrowRight, X } from 'lucide-react';
import { NOTIFICATION_TYPES } from '../../constants/notification.constants';
import { getRelativeTime } from '../../utils/date.utils';

const TYPE_CONFIG = {
    [NOTIFICATION_TYPES.BOOKING]: {
        icon: Calendar, iconClass: 'text-blue-500', bgClass: 'bg-blue-100 dark:bg-blue-900/30', label: 'Đặt lịch',
    },
    [NOTIFICATION_TYPES.ORDER]: {
        icon: ShoppingBag, iconClass: 'text-emerald-500', bgClass: 'bg-emerald-100 dark:bg-emerald-900/30', label: 'Đơn hàng',
    },
    [NOTIFICATION_TYPES.PROMOTION]: {
        icon: Tag, iconClass: 'text-purple-500', bgClass: 'bg-purple-100 dark:bg-purple-900/30', label: 'Ưu đãi',
    },
    [NOTIFICATION_TYPES.MAINTENANCE]: {
        icon: Wrench, iconClass: 'text-yellow-500', bgClass: 'bg-yellow-100 dark:bg-yellow-900/30', label: 'Bảo dưỡng',
    },
};

const getConfig = (type) =>
    TYPE_CONFIG[type] || { icon: Settings, iconClass: 'text-slate-500', bgClass: 'bg-slate-100 dark:bg-slate-800', label: 'Hệ thống' };

const DetailContent = ({ notification, onClose, t }) => {
    const config = getConfig(notification.type);
    const Icon = config.icon;
    return (
        <div className="w-[280px]">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-xl ${config.bgClass}`}>
                        <Icon className={`w-4 h-4 ${config.iconClass}`} />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${config.bgClass} ${config.iconClass}`}>
                        {config.label}
                    </span>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <X size={13} className="text-slate-400" />
                </button>
            </div>

            <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-snug mb-2">
                {notification.title}
            </h4>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                {notification.message}
            </p>

            {notification.reference_id && (
                <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-lg mb-3">
                    {notification.reference_id}
                </p>
            )}

            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">
                {getRelativeTime(notification.createdAt, t)}
            </p>

            {notification.reference_link && (
                <Link
                    to={notification.reference_link}
                    onClick={onClose}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-colors text-xs"
                >
                    Xem chi tiết <ArrowRight size={13} />
                </Link>
            )}
        </div>
    );
};

const NotificationItem = ({ notification, onRead, t }) => {
    const [open, setOpen] = useState(false);
    const config = getConfig(notification.type);
    const Icon = config.icon;

    const handleClick = () => {
        setOpen(true);
        if (!notification.is_read) onRead(notification);
    };

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
            placement="left"
            trigger="click"
            arrow={false}
            overlayInnerStyle={{ padding: 16, borderRadius: 16 }}
            content={<DetailContent notification={notification} onClose={() => setOpen(false)} t={t} />}
        >
            <button
                type="button"
                onClick={handleClick}
                className={`w-full text-left flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-[#1a1e28] transition-colors ${!notification.is_read ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''}`}
            >
                <div className={`mt-0.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl shadow-sm ${config.bgClass}`}>
                    <Icon className={`w-4 h-4 ${config.iconClass}`} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                        <p className={`text-sm truncate pr-2 ${!notification.is_read ? 'font-bold text-slate-800 dark:text-white' : 'font-semibold text-slate-600 dark:text-slate-300'}`}>
                            {notification.title}
                        </p>
                        {!notification.is_read && (
                            <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0 animate-pulse" />
                        )}
                    </div>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {notification.message}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                        {getRelativeTime(notification.createdAt, t)}
                    </p>
                </div>
            </button>
        </Popover>
    );
};

export default NotificationItem;
