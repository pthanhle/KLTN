import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOTIFICATION_TABS_CONFIG } from '../../constants/notificationPage.constants';
import { Button } from 'antd';

const NotificationTabsFilter = ({ activeTab, onChangeTab }) => {
    const { t } = useTranslation('profile');

    return (
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar relative z-10">
            {NOTIFICATION_TABS_CONFIG.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <Button
                        key={tab.id}
                        type={isActive ? "primary" : "default"}
                        onClick={() => onChangeTab(tab.id)}
                        className={`whitespace-nowrap px-6 !h-10 rounded-full font-semibold text-sm transition-all duration-300 border ${
                            isActive 
                                ? '!bg-yellow-500 !text-slate-900 border-none shadow-md shadow-yellow-500/20 hover:!bg-yellow-400' 
                                : 'bg-transparent text-slate-500 hover:!text-slate-800 dark:text-slate-400 dark:hover:!text-white border-slate-200 dark:border-white/10 hover:!border-slate-300 dark:hover:!border-white/20'
                        }`}
                    >
                        {t(tab.labelKey, tab.defaultLabel)}
                    </Button>
                );
            })}
        </div>
    );
};

export default NotificationTabsFilter;
