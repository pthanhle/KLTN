import { useState, useEffect, useMemo } from 'react';
import { fetchNotificationsAPI, markAllAsReadAPI } from '../../../../../../layout/CustomerLayout/Header/data/mockNotificationData';
import { NOTIFICATION_STATUS } from '../../../../../../layout/CustomerLayout/Header/constants/notification.constants';

import { FILTER_TABS } from '../constants/notificationPage.constants';

export const useNotificationPageLogic = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(FILTER_TABS.ALL);
    
    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchNotificationsAPI();
                if (response.success) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Handlers
    const handleMarkAllRead = async () => {
        try {
            await markAllAsReadAPI();
            setNotifications(prev => prev.map(n => ({ ...n, is_read: NOTIFICATION_STATUS.READ })));
        } catch (error) {
            console.error(error);
        }
    };

    const handleMarkAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: NOTIFICATION_STATUS.READ } : n));
    };

    const handleMarkAsUnread = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: NOTIFICATION_STATUS.UNREAD } : n));
    };

    const handleDelete = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Derived States
    const filteredNotifications = useMemo(() => {
        switch (activeTab) {
            case FILTER_TABS.UNREAD:
                return notifications.filter(n => n.is_read === NOTIFICATION_STATUS.UNREAD);
            case FILTER_TABS.READ:
                return notifications.filter(n => n.is_read === NOTIFICATION_STATUS.READ);
            case FILTER_TABS.ALL:
            default:
                return notifications;
        }
    }, [notifications, activeTab]);

    const unreadCount = useMemo(() => {
        return notifications.filter(n => n.is_read === NOTIFICATION_STATUS.UNREAD).length;
    }, [notifications]);

    return {
        notifications: filteredNotifications,
        isLoading,
        activeTab,
        setActiveTab,
        handleMarkAllRead,
        handleMarkAsRead,
        handleMarkAsUnread,
        handleDelete,
        unreadCount
    };
};
