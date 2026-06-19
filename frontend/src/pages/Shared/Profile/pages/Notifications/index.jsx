import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination } from 'antd';
import { useNotificationPageLogic } from './hooks/useNotificationPageLogic';
import NotificationHeader from './components/Header/NotificationHeader';
import NotificationTabsFilter from './components/Tabs/NotificationTabsFilter';
import NotificationGroup from './components/Group/NotificationGroup';
import EmptyNotification from './components/Feedback/EmptyNotification';
import NotificationSkeleton from './components/Feedback/NotificationSkeleton';

const ProfileNotifications = () => {
    const { t } = useTranslation('profile');
    const {
        notifications,
        totalNotifications,
        currentPage,
        setCurrentPage,
        pageSize,
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

                {totalNotifications === 0 ? (
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

                {totalNotifications > pageSize && (
                    <footer className="mt-10 flex justify-center pb-20">
                        <Pagination
                            current={currentPage}
                            total={totalNotifications}
                            pageSize={pageSize}
                            onChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            showSizeChanger={false}
                            showTotal={(total, range) => `${range[0]}–${range[1]} / ${total} thông báo`}
                        />
                    </footer>
                )}
            </div>
        </div>
    );
};

export default ProfileNotifications;
