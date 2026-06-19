import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import notificationApi from '../../../../../../services/api/notification.api';
import { FILTER_TABS } from '../constants/notificationPage.constants';

const QUERY_KEY = ['notifications'];
const PAGE_SIZE = 10;

export const useNotificationPageLogic = () => {
    const [activeTab, setActiveTab] = useState(FILTER_TABS.ALL);
    const [currentPage, setCurrentPage] = useState(1);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };
    const queryClient = useQueryClient();
    const accessToken = useSelector((state) => state.auth.accessToken);

    const { data: allNotifications = [], isLoading } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => notificationApi.getAll(),
        enabled: !!accessToken,
        select: (data) => (Array.isArray(data) ? data : []),
        staleTime: 1000 * 60 * 2,
    });

    const handleMarkAllRead = async () => {
        await notificationApi.markAllAsRead();
        queryClient.setQueryData(QUERY_KEY, (prev = []) => prev.map((n) => ({ ...n, is_read: true })));
    };

    const handleMarkAsRead = async (id) => {
        await notificationApi.markAsRead(id);
        queryClient.setQueryData(QUERY_KEY, (prev = []) =>
            prev.map((n) => (n._id === id ? { ...n, is_read: true } : n))
        );
    };

    const handleMarkAsUnread = (id) => {
        // Optimistic local toggle (backend doesn't expose unread endpoint — keep local only)
        queryClient.setQueryData(QUERY_KEY, (prev = []) =>
            prev.map((n) => (n._id === id ? { ...n, is_read: false } : n))
        );
    };

    const handleDelete = (id) => {
        queryClient.setQueryData(QUERY_KEY, (prev = []) => prev.filter((n) => n._id !== id));
    };

    const filteredNotifications = useMemo(() => {
        switch (activeTab) {
            case FILTER_TABS.UNREAD: return allNotifications.filter((n) => !n.is_read);
            case FILTER_TABS.READ:   return allNotifications.filter((n) => n.is_read);
            default:                 return allNotifications;
        }
    }, [allNotifications, activeTab]);

    const unreadCount = useMemo(() => allNotifications.filter((n) => !n.is_read).length, [allNotifications]);

    const paginatedNotifications = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredNotifications.slice(start, start + PAGE_SIZE);
    }, [filteredNotifications, currentPage]);

    return {
        notifications: paginatedNotifications,
        totalNotifications: filteredNotifications.length,
        currentPage,
        setCurrentPage,
        pageSize: PAGE_SIZE,
        isLoading,
        activeTab,
        setActiveTab: handleTabChange,
        handleMarkAllRead,
        handleMarkAsRead,
        handleMarkAsUnread,
        handleDelete,
        unreadCount,
    };
};
