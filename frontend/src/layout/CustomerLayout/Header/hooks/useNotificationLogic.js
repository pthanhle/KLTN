import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import notificationApi from '@/services/api/notification.api';
import { socket } from '@/services/socket';

const QUERY_KEY = ['notifications'];

export const useNotificationLogic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const accessToken = useSelector((state) => state.auth.accessToken);

    const { data: notifications = [], isLoading } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => notificationApi.getAll(),
        enabled: !!accessToken,
        select: (data) => (Array.isArray(data) ? data : []),
        staleTime: 1000 * 60 * 2,
    });

    // Connect socket and listen for real-time notifications
    useEffect(() => {
        if (!accessToken) return;

        if (!socket.connected) {
            socket.auth = { token: accessToken };
            socket.connect();
        }

        const handleNewNotification = (notification) => {
            queryClient.setQueryData(QUERY_KEY, (prev = []) => [notification, ...prev]);
        };

        socket.on('new_notification', handleNewNotification);
        return () => {
            socket.off('new_notification', handleNewNotification);
        };
    }, [accessToken, queryClient]);

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleMarkAllRead = async () => {
        await notificationApi.markAllAsRead();
        queryClient.setQueryData(QUERY_KEY, (prev = []) =>
            prev.map((n) => ({ ...n, is_read: true }))
        );
    };

    const handleClickItem = useCallback(async (notification) => {
        if (!notification.is_read) {
            await notificationApi.markAsRead(notification._id);
            queryClient.setQueryData(QUERY_KEY, (prev = []) =>
                prev.map((n) => (n._id === notification._id ? { ...n, is_read: true } : n))
            );
        }
    }, [queryClient]);

    return {
        notifications,
        isLoading,
        isOpen,
        setIsOpen,
        unreadCount,
        toggleDropdown,
        handleMarkAllRead,
        handleClickItem,
    };
};
