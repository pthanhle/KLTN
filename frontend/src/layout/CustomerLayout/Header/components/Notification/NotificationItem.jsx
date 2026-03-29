import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Wrench, Tag, FileText } from 'lucide-react';
import { NOTIFICATION_TYPES } from '../../constants/notification.constants';
import { getRelativeTime } from '../../utils/date.utils';

const NotificationItem = ({ notification, onClick, t }) => {
    const renderIcon = (type) => {
        switch (type) {
            case NOTIFICATION_TYPES.SERVICE_UPDATE:
                return <Wrench className="w-4 h-4 text-blue-500" />;
            case NOTIFICATION_TYPES.SYSTEM_ALERT:
                return <Settings className="w-4 h-4 text-emerald-500" />;
            case NOTIFICATION_TYPES.PROMOTION:
                return <Tag className="w-4 h-4 text-purple-500" />;
            case NOTIFICATION_TYPES.QUOTATION_WAITED:
                return <FileText className="w-4 h-4 text-yellow-500" />;
            default:
                return <Wrench className="w-4 h-4 text-slate-500" />;
        }
    };

    const renderBgIcon = (type) => {
        switch (type) {
            case NOTIFICATION_TYPES.SERVICE_UPDATE:
                return 'bg-blue-100 dark:bg-blue-900/30';
            case NOTIFICATION_TYPES.SYSTEM_ALERT:
                return 'bg-emerald-100 dark:bg-emerald-900/30';
            case NOTIFICATION_TYPES.PROMOTION:
                return 'bg-purple-100 dark:bg-purple-900/30';
            case NOTIFICATION_TYPES.QUOTATION_WAITED:
                return 'bg-yellow-100 dark:bg-yellow-900/30';
            default:
                return 'bg-slate-100 dark:bg-slate-900/30';
        }
    };

    return (
        <Link
            to={notification.reference_link || '#'}
            onClick={() => onClick(notification.id)}
            className={`flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-[#1a1e28] transition-colors ${!notification.is_read ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''}`}
        >
            <div className={`mt-0.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl shadow-sm ${renderBgIcon(notification.type)}`}>
                {renderIcon(notification.type)}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                    <p className={`text-sm truncate pr-2 ${!notification.is_read ? 'font-bold text-slate-800 dark:text-white' : 'font-semibold text-slate-600 dark:text-slate-300'}`}>
                        {notification.title}
                    </p>
                    {!notification.is_read && (
                        <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0 animate-pulse"></span>
                    )}
                </div>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {notification.message}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                    {getRelativeTime(notification.created_at, t)}
                </p>
            </div>
        </Link>
    );
};

export default NotificationItem;
