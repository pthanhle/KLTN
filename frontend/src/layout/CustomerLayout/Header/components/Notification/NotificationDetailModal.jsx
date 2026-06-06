import React from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { Bell, Wrench, ShoppingBag, Settings, Tag, Calendar, ArrowRight, X } from 'lucide-react';
import { NOTIFICATION_TYPES } from '../../constants/notification.constants';
import { getRelativeTime } from '../../utils/date.utils';
import { useTranslation } from 'react-i18next';

const TYPE_CONFIG = {
    [NOTIFICATION_TYPES.BOOKING]: {
        icon: Calendar,
        iconClass: 'text-blue-500',
        bgClass: 'bg-blue-100 dark:bg-blue-900/30',
        label: 'Đặt lịch',
    },
    [NOTIFICATION_TYPES.ORDER]: {
        icon: ShoppingBag,
        iconClass: 'text-emerald-500',
        bgClass: 'bg-emerald-100 dark:bg-emerald-900/30',
        label: 'Đơn hàng',
    },
    [NOTIFICATION_TYPES.PROMOTION]: {
        icon: Tag,
        iconClass: 'text-purple-500',
        bgClass: 'bg-purple-100 dark:bg-purple-900/30',
        label: 'Ưu đãi',
    },
    [NOTIFICATION_TYPES.MAINTENANCE]: {
        icon: Wrench,
        iconClass: 'text-yellow-500',
        bgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
        label: 'Bảo dưỡng',
    },
    [NOTIFICATION_TYPES.SYSTEM]: {
        icon: Settings,
        iconClass: 'text-slate-500',
        bgClass: 'bg-slate-100 dark:bg-slate-800',
        label: 'Hệ thống',
    },
};

const getConfig = (type) => TYPE_CONFIG[type] || TYPE_CONFIG[NOTIFICATION_TYPES.SYSTEM];

const NotificationDetailModal = ({ notification, onClose }) => {
    const { t } = useTranslation('layout');
    if (!notification) return null;

    const config = getConfig(notification.type);
    const Icon = config.icon;

    return (
        <Modal
            open={!!notification}
            onCancel={onClose}
            footer={null}
            centered
            closable={false}
            width={480}
            styles={{
                content: { padding: 0, borderRadius: 20, overflow: 'hidden' },
                mask: { backdropFilter: 'blur(4px)' },
            }}
        >
            <div className="bg-white dark:bg-[#0e121a]">
                {/* Header bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#161a23]">
                    <div className="flex items-center gap-2">
                        <Bell size={16} className="text-yellow-500" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Chi tiết thông báo</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <X size={16} className="text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                    <div className="flex items-start gap-4 mb-5">
                        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl shadow-sm ${config.bgClass}`}>
                            <Icon className={`w-6 h-6 ${config.iconClass}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${config.bgClass} ${config.iconClass}`}>
                                {config.label}
                            </span>
                            <h3 className="text-base font-black text-slate-800 dark:text-white leading-snug">
                                {notification.title}
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                        {notification.message}
                    </p>

                    {notification.reference_id && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 mb-4 font-mono bg-slate-50 dark:bg-white/5 px-3 py-2 rounded-lg">
                            Mã tham chiếu: <span className="font-bold text-slate-600 dark:text-slate-300">{notification.reference_id}</span>
                        </div>
                    )}

                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-5">
                        {getRelativeTime(notification.createdAt, t)}
                    </p>

                    {notification.reference_link && (
                        <Link
                            to={notification.reference_link}
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-colors text-sm"
                        >
                            Xem chi tiết
                            <ArrowRight size={15} />
                        </Link>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default NotificationDetailModal;
