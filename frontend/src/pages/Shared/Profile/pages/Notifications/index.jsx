import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotificationPageLogic } from './hooks/useNotificationPageLogic';
import NotificationHeader from './components/Header/NotificationHeader';
import NotificationTabsFilter from './components/Tabs/NotificationTabsFilter';
import NotificationGroup from './components/Group/NotificationGroup';
import EmptyNotification from './components/Feedback/EmptyNotification';
import NotificationSkeleton from './components/Feedback/NotificationSkeleton';
import { ChevronDown } from 'lucide-react';
import { Button } from 'antd';

const ProfileNotifications = () => {
    const { t } = useTranslation('profile');
    const {
        notifications,
        isLoading,
        activeTab,
        setActiveTab,
        handleMarkAllRead,
        handleMarkAsRead,
        handleMarkAsUnread,
        handleDelete,
        unreadCount
    } = useNotificationPageLogic();

    const groupedNotifications = useMemo(() => {
        const today = [];
        const yesterday = [];
        const older = [];
        
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const yest = new Date(now);
        yest.setDate(yest.getDate() - 1);

        notifications.forEach(notif => {
            const date = new Date(notif.createdAt);
            if (date >= now) {
                today.push(notif);
            } else if (date >= yest) {
                yesterday.push(notif);
            } else {
                older.push(notif);
            }
        });

        return { today, yesterday, older };
    }, [notifications]);

    if (isLoading) {
        return <div className="p-8 max-w-5xl mx-auto"><NotificationSkeleton /></div>;
    }

    return (
        <div className="bg-slate-50/50 dark:bg-transparent min-h-screen relative md:p-4 overflow-hidden rounded-[2rem]">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
            
            <div className="max-w-4xl mx-auto relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <NotificationHeader 
                    unreadCount={unreadCount} 
                    onMarkAllRead={handleMarkAllRead} 
                />

                <NotificationTabsFilter 
                    activeTab={activeTab} 
                    onChangeTab={setActiveTab} 
                />

                {notifications.length === 0 ? (
                    <EmptyNotification />
                ) : (
                    <div className="space-y-12 mb-16">
                        <NotificationGroup 
                            title={t('notif_group_today', 'Hôm nay')} 
                            notifications={groupedNotifications.today} 
                            onMarkRead={handleMarkAsRead}
                            onMarkUnread={handleMarkAsUnread}
                            onDelete={handleDelete}
                        />
                        <NotificationGroup 
                            title={t('notif_group_yesterday', 'Hôm qua')} 
                            notifications={groupedNotifications.yesterday} 
                            onMarkRead={handleMarkAsRead}
                            onMarkUnread={handleMarkAsUnread}
                            onDelete={handleDelete}
                        />
                        <NotificationGroup 
                            title={t('notif_group_older', 'Cũ hơn')} 
                            notifications={groupedNotifications.older} 
                            onMarkRead={handleMarkAsRead}
                            onMarkUnread={handleMarkAsUnread}
                            onDelete={handleDelete}
                        />
                    </div>
                )}

                {/* Load More Footer */}
                {notifications.length > 0 && (
                    <footer className="mt-16 flex justify-center pb-20">
                        <Button 
                            className="group flex flex-row-reverse items-center justify-center gap-2 px-8 md:px-10 !h-12 bg-white dark:bg-[#141416] rounded-full border border-slate-200 dark:border-white/10 hover:!border-yellow-500/50 dark:hover:!border-yellow-500/50 transition-all duration-500 shadow-sm"
                            icon={<ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-yellow-500 group-hover:translate-y-1 transition-transform" />}
                        >
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                                {t('notif_btn_load_more', 'Xem thêm thông báo')}
                            </span>
                        </Button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default ProfileNotifications;
