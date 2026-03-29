import React from 'react';
import { Inbox } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EmptyNotification = () => {
    const { t } = useTranslation('profile');
    
    return (
        <div className="flex flex-col items-center justify-center text-center opacity-60 py-20 px-8">
            <Inbox className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-6" strokeWidth={1} />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {t('notif_empty_title', 'Không có thông báo nào')}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-sm">
                {t('notif_empty_desc', 'Bạn đã xem hết tất cả thông báo cập nhật từ hệ thống.')}
            </p>
        </div>
    );
};

export default EmptyNotification;
