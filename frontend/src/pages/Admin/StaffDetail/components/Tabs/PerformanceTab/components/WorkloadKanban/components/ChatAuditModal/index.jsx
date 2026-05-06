import React, { useState } from 'react';
import { useLockBodyScroll } from '../../../../hooks/useLockBodyScroll';
import { ChatAuditHeader } from './ChatAuditHeader';
import { ChatAuditSidebar } from './ChatAuditSidebar';
import { ChatAuditTranscript } from './ChatAuditTranscript';
import { ChatAuditActionBar } from './ChatAuditActionBar';

export const ChatAuditModal = ({ task, staffName, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    useLockBodyScroll(true);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 200);
    };

    if (!task) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <div 
                className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            ></div>

            <div className={`relative w-full max-w-4xl bg-white dark:bg-[#141416] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col h-[85vh] transition-all duration-200 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                
                <ChatAuditHeader task={task} onClose={handleClose} />

                <div className="flex-1 flex overflow-hidden">
                    <ChatAuditSidebar task={task} />
                    
                    <div className="flex-1 flex flex-col bg-white dark:bg-[#1c1c1e]">
                        <ChatAuditTranscript chatLogs={task.chatLogs} staffName={staffName} customerName={task.customerName} />
                        <ChatAuditActionBar />
                    </div>
                </div>
            </div>
        </div>
    );
};
