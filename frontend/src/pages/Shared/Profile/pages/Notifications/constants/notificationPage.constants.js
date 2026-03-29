export const FILTER_TABS = {
    ALL: 'ALL',
    UNREAD: 'UNREAD',
    READ: 'READ'
};

export const NOTIFICATION_TABS_CONFIG = [
    { id: FILTER_TABS.ALL, labelKey: 'notif_tab_all', defaultLabel: 'Tất cả' },
    { id: FILTER_TABS.UNREAD, labelKey: 'notif_tab_unread', defaultLabel: 'Chưa đọc' },
    { id: FILTER_TABS.READ, labelKey: 'notif_tab_read', defaultLabel: 'Đã đọc' }
];
