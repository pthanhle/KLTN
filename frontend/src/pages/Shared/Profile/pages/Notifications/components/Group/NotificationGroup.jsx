import React from 'react';
import NotificationCard from '../Card/NotificationCard';

const NotificationGroup = ({ title, notifications, onMarkRead, onMarkUnread, onDelete }) => {
    if (!notifications || notifications.length === 0) return null;

    return (
        <section className="relative z-10 w-full mb-10">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 shrink-0">
                    {title}
                </h3>
                <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10"></div>
            </div>
            
            <div className="grid gap-4 md:gap-5 w-full">
                {notifications.map(notif => (
                    <NotificationCard
                        key={notif._id}
                        notification={notif}
                        onMarkRead={onMarkRead}
                        onMarkUnread={onMarkUnread}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </section>
    );
};

export default NotificationGroup;
