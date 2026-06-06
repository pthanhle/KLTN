import React from 'react';
import BrandLogo from '@/assets/images/brand/logo.png';
import BookingConfirmationCard from './BookingConfirmationCard';

const MessageBubble = ({ msg, t, onConfirmBooking }) => {
    const isUser = msg.sender === 'user';
    const timeString = new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isUser) {
        return (
            <div className="flex justify-end animate-in fade-in slide-in-from-right-2 duration-300">
                <div className="space-y-1.5 max-w-[85%] flex flex-col items-end">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3.5 rounded-2xl rounded-tr-sm text-slate-900 text-[15px] font-medium shadow-md shadow-yellow-500/20 whitespace-pre-wrap leading-relaxed">
                        {msg.text}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-1">
                        {timeString} · {t ? t('chatbot_you') : 'You'}
                    </span>
                </div>
            </div>
        );
    }

    if (msg.type === 'booking_card') {
        return (
            <div className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-1 mb-auto">
                    <img src={BrandLogo} alt="AI" className="w-full h-full object-contain transition-all duration-300 [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" />
                </div>
                <BookingConfirmationCard
                    bookingDraft={msg.bookingDraft}
                    onConfirm={onConfirmBooking}
                />
            </div>
        );
    }

    return (
        <div className="flex gap-3 group animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-1 mb-auto">
                <img src={BrandLogo} alt="AI" className="w-full h-full object-contain transition-all duration-300 [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" />
            </div>
            <div className="space-y-1.5 max-w-[85%]">
                <div className="bg-slate-50 dark:bg-[#1c1c1e] p-4 py-3.5 rounded-2xl rounded-tl-sm text-slate-800 dark:text-slate-200 text-[15px] leading-relaxed border border-slate-200 dark:border-white/5 shadow-sm space-y-2 whitespace-pre-wrap">
                    {msg.text}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-1 inline-block">
                    {timeString} · {t ? t('chatbot_ai') : 'AI'}
                </span>
            </div>
        </div>
    );
};

export default MessageBubble;
