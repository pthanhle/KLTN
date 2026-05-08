import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Settings, Wrench, Tag, FileText, MoreVertical, Eye, EyeOff, Trash2 } from 'lucide-react';
import { NOTIFICATION_TYPES, NOTIFICATION_STATUS } from '../../../../../../../layout/CustomerLayout/Header/constants/notification.constants';
import { getRelativeTime } from '../../../../../../../layout/CustomerLayout/Header/utils/date.utils';

const NotificationCard = ({ notification, onMarkRead, onMarkUnread, onDelete }) => {
    const { t } = useTranslation('profile');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderIcon = (type) => {
        switch (type) {
            case NOTIFICATION_TYPES.SERVICE_UPDATE:
                return <Wrench className="w-5 h-5 text-blue-500" />;
            case NOTIFICATION_TYPES.SYSTEM_ALERT:
                return <Settings className="w-5 h-5 text-emerald-500" />;
            case NOTIFICATION_TYPES.PROMOTION:
                return <Tag className="w-5 h-5 text-purple-500" />;
            case NOTIFICATION_TYPES.QUOTATION_WAITED:
                return <FileText className="w-5 h-5 text-yellow-500" />;
            default:
                return <Wrench className="w-5 h-5 text-slate-500" />;
        }
    };

    const isUnread = notification.is_read === NOTIFICATION_STATUS.UNREAD;

    return (
        <div className={`relative group border-l-4 backdrop-blur-[20px] rounded-r-2xl p-6 transition-all duration-300 hover:translate-x-1 flex gap-4 md:gap-6 items-start shadow-sm hover:shadow-md ${
            isUnread 
                ? 'bg-yellow-50/50 dark:bg-yellow-500/5 border-yellow-500 dark:border-yellow-500' 
                : 'bg-white/80 dark:bg-[#141416]/80 border-slate-200 dark:border-white/5 opacity-80 hover:opacity-100'
        }`}>
            {/* Visual Icon Box */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                isUnread ? 'bg-white dark:bg-[#1a2138] border-yellow-500/20 shadow-sm' : 'bg-slate-50 dark:bg-[#1a2138] border-slate-100 dark:border-white/5'
            }`}>
                {renderIcon(notification.type)}
            </div>

            {/* Content Body */}
            <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className={`text-base md:text-[17px] leading-tight truncate pr-4 ${
                        isUnread ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'
                    }`}>
                        {notification.title}
                    </h4>
                    <span className="text-[10px] md:text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-tighter whitespace-nowrap mt-0.5">
                        {getRelativeTime(notification.created_at, t)}
                    </span>
                </div>
                
                <p className={`text-sm leading-relaxed line-clamp-2 md:line-clamp-3 ${
                    isUnread ? 'text-slate-600 dark:text-slate-400 font-medium' : 'text-slate-500 dark:text-slate-500'
                }`}>
                    {notification.message}
                </p>

                {/* Sub Action Buttons */}
                <div className="pt-3 flex gap-4">
                    <Link 
                        to={notification.reference_link || '#'}
                        className="text-[10px] md:text-[11px] font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-[0.15em] hover:underline underline-offset-4"
                    >
                        {t('notif_action_detail', 'Chi tiết')}
                    </Link>
                </div>
            </div>

            {/* Context Menu (3 dots) */}
            <div className="relative" ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1 md:p-2 text-slate-400 hover:text-yellow-600 dark:text-slate-500 dark:hover:text-yellow-500 transition-all rounded-full hover:bg-slate-100 dark:hover:bg-[#1a2138] opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                    <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1a2138] rounded-xl shadow-xl border border-slate-100 dark:border-white/5 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                        {isUnread ? (
                            <button 
                                onClick={() => { onMarkRead(notification.id); setIsMenuOpen(false); }}
                                className="w-full text-left px-4 py-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#23293c] transition-colors flex gap-2 items-center"
                            >
                                <Eye className="w-4 h-4" />
                                {t('notif_action_mark_read', 'Đánh dấu đã đọc')}
                            </button>
                        ) : (
                            <button 
                                onClick={() => { onMarkUnread(notification.id); setIsMenuOpen(false); }}
                                className="w-full text-left px-4 py-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#23293c] transition-colors flex gap-2 items-center"
                            >
                                <EyeOff className="w-4 h-4" />
                                {t('notif_action_mark_unread', 'Đánh dấu chưa đọc')}
                            </button>
                        )}
                        <hr className="border-slate-100 dark:border-white/5" />
                        <button 
                            onClick={() => { onDelete(notification.id); setIsMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 text-[13px] font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex gap-2 items-center"
                        >
                            <Trash2 className="w-4 h-4" />
                            {t('notif_action_delete', 'Xóa thông báo')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;
