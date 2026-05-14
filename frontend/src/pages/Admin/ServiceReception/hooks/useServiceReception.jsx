import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GitMerge, LayoutGrid, Inbox, Activity } from 'lucide-react';
import dayjs from 'dayjs';
import ReceptionTab from '../tabs/ReceptionTab';
import WorkshopTab from '../tabs/WorkshopTab';
import InboxTab from '../tabs/InboxTab';
import TrackingTab from '../tabs/TrackingTab';
import SettlementTab from '../tabs/SettlementTab';

export const useServiceReception = () => {
    const { t } = useTranslation('adminServiceReception');
    const [activeTab, setActiveTab] = useState('inbox');
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const breadcrumbItems = [
        { label: t('header_title', 'Quản lý Lịch Dịch Vụ') }
    ];

    const tabItems = [
        {
            key: 'inbox',
            label: (
                <div className="flex items-center gap-2 px-2">
                    <Inbox size={16} />
                    <span>{t('tab_inbox', 'Yêu Cầu Đặt Lịch')}</span>
                </div>
            ),
            children: <InboxTab />,
        },
        {
            key: 'reception',
            label: (
                <div className="flex items-center gap-2 px-2">
                    <GitMerge size={16} />
                    <span>{t('tab_reception', 'Điều Phối Tiếp Nhận')}</span>
                </div>
            ),
            children: <ReceptionTab selectedDate={selectedDate} />,
        },
        {
            key: 'workshop',
            label: (
                <div className="flex items-center gap-2 px-2">
                    <LayoutGrid size={16} />
                    <span>{t('tab_workshop', 'Điều Phối Xưởng')}</span>
                </div>
            ),
            children: <WorkshopTab selectedDate={selectedDate} />,
        },
        {
            key: 'tracking',
            label: (
                <div className="flex items-center gap-2 px-2">
                    <Activity size={16} />
                    <span>{t('tab_tracking', 'Giám Sát RO Tổng')}</span>
                </div>
            ),
            children: <TrackingTab />,
        },
        {
            key: 'settlement',
            label: (
                <div className="flex items-center gap-2 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 11-3-3-3 3"/><path d="M19 19V8"/></svg>
                    <span>{t('tab_settlement', 'Quyết Toán & Bàn Giao')}</span>
                </div>
            ),
            children: <SettlementTab />,
        }
    ];

    return {
        t,
        activeTab,
        setActiveTab,
        selectedDate,
        setSelectedDate,
        breadcrumbItems,
        tabItems
    };
};
