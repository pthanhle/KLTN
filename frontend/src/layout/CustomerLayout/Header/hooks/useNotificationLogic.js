import { useState, useEffect } from 'react';
import { fetchNotificationsAPI, markAllAsReadAPI } from '../data/mockNotificationData';

export const useNotificationLogic = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    // Initial Fetch (Mô phỏng Lifecycle Mount)
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchNotificationsAPI();
                if (response.success) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error("Failed to load notifications", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Derived States (Data Computation)
    const unreadCount = notifications.filter(n => !n.is_read).length;

    // Handlers
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleMarkAllRead = async () => {
        try {
            const res = await markAllAsReadAPI();
            if (res.success) {
                setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            }
        } catch (error) {
            console.error("Failed to mark read", error);
        }
    };

    const handleClickItem = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, is_read: true } : n)
        );
        setIsOpen(false); // Close dropdown on action
    };

    return {
        notifications,
        isLoading,
        isOpen,
        setIsOpen,
        unreadCount,
        toggleDropdown,
        handleMarkAllRead,
        handleClickItem
    };
};
