import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCheck } from 'lucide-react';
import { Button } from 'antd';

const NotificationHeader = ({ unreadCount, onMarkAllRead }) => {
    const { t } = useTranslation('profile');

    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
            <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                    {t('notif_page_title', 'Thông báo')}
                </h2>
                <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                        <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                            {unreadCount} {t('notif_badge_new', 'Mới')}
                        </span>
                    )}
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-tight">
                        {t('notif_page_desc', 'Cập nhật mới nhất từ hệ thống TT AUTO')}
                    </p>
                </div>
            </div>
            
            {unreadCount > 0 && (
                <Button 
                    onClick={onMarkAllRead}
                    icon={<CheckCheck className="w-4 h-4" />}
                    className="group shadow-sm flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-500 font-medium text-sm px-5 !h-10 bg-white dark:bg-[#141416] rounded-full border border-slate-200 dark:border-white/10 hover:!bg-yellow-500 hover:!text-slate-900 transition-all duration-300"
                >
                    {t('notif_btn_mark_all', 'Đánh dấu tất cả là đã đọc')}
                </Button>
            )}
        </header>
    );
};

export default NotificationHeader;
