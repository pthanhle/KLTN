import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';

export const ChatAuditSidebar = ({ task }) => {
    const { t } = useTranslation();

    return (
        <div className="w-1/3 border-r border-slate-200 dark:border-white/10 bg-slate-50/30 dark:bg-white/[0.02] p-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-6">
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                        <User size={12} />
                        {t('adminStaffDetail:modal_client_info', 'Khách hàng')}
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white dark:bg-white/5 p-3 rounded-lg border border-slate-100 dark:border-white/5">
                            <span className="text-sm text-slate-500">{t('adminStaffDetail:modal_name', 'Họ tên')}:</span>
                            <span className="text-sm font-semibold text-slate-800 dark:text-white">
                                {task.customerName || t('adminStaffDetail:modal_not_available')}
                            </span>
                        </div>
                        <div className="flex justify-between items-center bg-white dark:bg-white/5 p-3 rounded-lg border border-slate-100 dark:border-white/5">
                            <span className="text-sm text-slate-500">{t('adminStaffDetail:modal_phone', 'SĐT')}:</span>
                            <span className="text-sm font-semibold text-slate-800 dark:text-white">
                                {task.customerPhone || t('adminStaffDetail:modal_not_available')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
