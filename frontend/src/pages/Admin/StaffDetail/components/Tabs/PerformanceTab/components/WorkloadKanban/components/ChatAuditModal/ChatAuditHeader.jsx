import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, MessageCircle } from 'lucide-react';

export const ChatAuditHeader = ({ task, onClose }) => {
    const { t } = useTranslation();

    return (
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <MessageCircle className="text-yellow-500" size={20} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-slate-200 dark:bg-[#2e3447] text-slate-700 dark:text-gray-300 font-mono text-xs font-bold px-2 py-0.5 rounded uppercase">
                            {task.id}
                        </span>
                        <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            {t('adminStaffDetail:chat_live')}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
                        {task.title}
                    </h3>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                        {t('adminStaffDetail:chat_sla_limit')}
                    </div>
                    <div className="text-sm font-bold text-yellow-600 dark:text-yellow-500">{task.sla}</div>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 rounded-full text-slate-500 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};
