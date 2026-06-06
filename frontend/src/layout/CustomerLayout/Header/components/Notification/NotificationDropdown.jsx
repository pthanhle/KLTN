import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Bell, CheckSquare, Inbox } from 'lucide-react';
import { Skeleton } from 'antd';
import { useNotificationLogic } from '../../hooks/useNotificationLogic';
import NotificationItem from './NotificationItem';

const NotificationDropdown = () => {
    const { t } = useTranslation('layout');
    const wrapperRef = useRef(null);
    const {
        notifications,
        isLoading,
        isOpen,
        setIsOpen,
        unreadCount,
        toggleDropdown,
        handleMarkAllRead,
        handleClickItem,
    } = useNotificationLogic();

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    const previewList = notifications.slice(0, 5);

    return (
        <div ref={wrapperRef} className="relative">
            {/* Bell Button */}
            <button
                onClick={toggleDropdown}
                className={`relative p-2 rounded-full transition-all ${isOpen ? 'bg-slate-100 dark:bg-white/10 text-yellow-600 dark:text-yellow-500' : 'hover:bg-slate-50 dark:hover:bg-white/5 hover:text-yellow-500 text-slate-700 dark:text-slate-300'}`}
            >
                <Bell size={20} className={isOpen ? 'animate-pulse' : ''} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-[#0b0f19] rounded-full" />
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-[340px] md:w-[380px] bg-white dark:bg-[#0e121a] rounded-[24px] shadow-2xl dark:shadow-[0_15px_50px_rgba(0,0,0,0.8)] border border-slate-200/60 dark:border-white/5 overflow-visible z-[100] transform transition-all animate-in fade-in zoom-in-95 duration-200">

                    {/* Header */}
                    <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#161a23]/50 backdrop-blur-md rounded-t-[24px]">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-800 dark:text-white">{t('notifications.title', 'Thông báo')}</h3>
                            {unreadCount > 0 && (
                                <span className="bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                                    {unreadCount} {t('notifications.new', 'Mới')}
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-[12px] font-bold text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors flex items-center gap-1.5"
                            >
                                <CheckSquare size={14} />
                                {t('notifications.mark_all_read', 'Đọc tất cả')}
                            </button>
                        )}
                    </div>

                    {/* Scrollable List */}
                    <div className="max-h-[420px] overflow-y-auto no-scrollbar rounded-b-none">
                        {isLoading ? (
                            <div className="p-5 flex flex-col gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <Skeleton.Avatar active shape="square" size={36} className="!rounded-xl" />
                                        <div className="flex-1">
                                            <Skeleton active title={{ width: '80%' }} paragraph={{ rows: 2, width: ['100%', '60%'] }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : previewList.length === 0 ? (
                            <div className="p-8 flex flex-col items-center justify-center text-center opacity-60">
                                <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" strokeWidth={1.5} />
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t('notifications.empty', 'Không có thông báo nào')}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
                                {previewList.map((notif) => (
                                    <NotificationItem
                                        key={notif._id}
                                        notification={notif}
                                        onRead={handleClickItem}
                                        t={t}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-slate-50 dark:bg-[#161a23] border-t border-slate-100 dark:border-white/5 text-center rounded-b-[24px]">
                        <Link
                            to="/profile/notifications"
                            onClick={() => setIsOpen(false)}
                            className="text-[13px] font-bold text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors uppercase tracking-widest inline-flex items-center gap-1"
                        >
                            {t('notifications.view_all', { count: notifications.length, defaultValue: `Xem tất cả (${notifications.length})` })}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
