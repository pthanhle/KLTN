import React from 'react';

const SystemNotice = ({ t }) => {
    return (
        <div className="mt-8 p-6 bg-yellow-500/5 dark:bg-[#141416] rounded-xl border border-yellow-500/20 dark:border-white/5 relative overflow-hidden flex items-center justify-between">
            <div className="relative z-10">
                <span className="font-bold text-xs uppercase tracking-widest text-yellow-600 dark:text-yellow-500 mb-1 block">
                    {t('adminStaffAttendance:notice_system_title', 'System Notice')}
                </span>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                    {t('adminStaffAttendance:notice_sync_active', 'Attendance Sync Active')}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {t('adminStaffAttendance:notice_sync_desc', 'Biometric terminals at Service Bay 1 & 2 are currently online and syncing.')}
                </p>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-yellow-500/10 to-transparent z-0"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-yellow-500/10 dark:border-white/5 rounded-full z-0"></div>
            <div className="absolute right-10 top-10 w-20 h-20 border border-yellow-500/10 dark:border-white/5 rounded-full z-0"></div>
        </div>
    );
};

export default SystemNotice;
