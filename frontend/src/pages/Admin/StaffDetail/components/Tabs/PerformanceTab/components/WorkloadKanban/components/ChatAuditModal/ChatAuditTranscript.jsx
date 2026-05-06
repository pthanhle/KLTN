import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { CHAT_SENDER } from '../../../../constants/performanceConstants';

export const ChatAuditTranscript = ({ chatLogs, staffName, customerName }) => {
    const { t } = useTranslation();

    return (
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
            {chatLogs && chatLogs.length > 0 ? (
                chatLogs.map((log, index) => {
                    const isStaff = log.sender === CHAT_SENDER.STAFF;
                    const displayName = isStaff 
                        ? (staffName || t('adminStaffDetail:chat_sender_staff')) 
                        : (customerName || t('adminStaffDetail:chat_sender_customer'));

                    return (
                        <div key={index} className={`flex flex-col max-w-[80%] ${isStaff ? 'self-end items-end' : 'self-start items-start'}`}>
                            <span className="text-[10px] text-slate-400 mb-1 px-1 font-semibold">
                                {displayName} • <span className="font-normal opacity-80">{log.time}</span>
                            </span>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                                isStaff 
                                    ? 'bg-slate-800 dark:bg-yellow-500 text-white rounded-tr-sm' 
                                    : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white rounded-tl-sm'
                            }`}>
                                {log.text}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="m-auto text-center text-slate-400 text-sm">
                    <MessageCircle className="mx-auto mb-2 opacity-50" size={32} />
                    {t('adminStaffDetail:chat_empty')}
                </div>
            )}
        </div>
    );
};
