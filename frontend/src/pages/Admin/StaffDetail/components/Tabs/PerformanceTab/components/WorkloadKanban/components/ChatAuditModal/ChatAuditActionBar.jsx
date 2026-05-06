import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, ShieldAlert } from 'lucide-react';

export const ChatAuditActionBar = () => {
    const { t } = useTranslation();
    const [whisperText, setWhisperText] = useState('');

    const handleWhisper = () => {
        if (!whisperText.trim()) return;
        // Mock sending whisper
        setWhisperText('');
    };

    return (
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
            <div className="flex gap-3 mb-2">
                <div className="flex-1 flex bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow-500/50 transition-all">
                    <div className="pl-3 py-3 flex items-center justify-center text-yellow-600">
                        <ShieldAlert size={16} />
                    </div>
                    <input 
                        type="text"
                        value={whisperText}
                        onChange={(e) => setWhisperText(e.target.value)}
                        placeholder={t('adminStaffDetail:chat_whisper_placeholder')}
                        className="flex-1 bg-transparent border-none outline-none text-sm px-3 py-3 text-slate-700 dark:text-yellow-100 placeholder-yellow-600/50"
                        onKeyDown={(e) => e.key === 'Enter' && handleWhisper()}
                    />
                    <button 
                        onClick={handleWhisper}
                        className="px-4 py-2 m-1 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                        {t('adminStaffDetail:chat_send')} <Send size={14} />
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center px-1">
                <span className="text-xs text-slate-500">
                    {t('adminStaffDetail:chat_admin_mode')}
                </span>
                <button className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">
                    {t('adminStaffDetail:chat_takeover')}
                </button>
            </div>
        </div>
    );
};
