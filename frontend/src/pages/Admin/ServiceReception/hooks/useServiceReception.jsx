import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GitMerge, LayoutGrid, Inbox } from 'lucide-react';
import dayjs from 'dayjs';
import ReceptionTab from '../tabs/ReceptionTab';
import WorkshopTab from '../tabs/WorkshopTab';
import InboxTab from '../tabs/InboxTab';

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
