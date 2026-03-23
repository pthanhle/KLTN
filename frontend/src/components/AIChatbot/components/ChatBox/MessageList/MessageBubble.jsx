import { CarFront } from 'lucide-react';

const MessageBubble = ({ msg, isWelcome, t }) => {
    const isUser = msg.sender === 'user';
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isUser) {
        return (
            <div className="flex justify-end animate-in fade-in slide-in-from-right-2 duration-300">
                <div className="space-y-1.5 max-w-[85%] flex flex-col items-end">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3.5 rounded-2xl rounded-tr-sm text-slate-900 text-[15px] font-medium shadow-md shadow-yellow-500/20 whitespace-pre-wrap leading-relaxed">
                        {msg.text}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-1">
                        {timeString} · {t('chatbot_you')}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-3 group animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="bg-yellow-500 p-1.5 rounded-xl text-slate-900 shrink-0 mt-1 shadow-md shadow-yellow-500/20 h-max">
                <CarFront size={18} className="stroke-slate-900" />
            </div>
            <div className="space-y-1.5 max-w-[85%]">
                <div className="bg-slate-50 dark:bg-[#1a2030] p-4 py-3.5 rounded-2xl rounded-tl-sm text-slate-800 dark:text-slate-200 text-[15px] leading-relaxed border border-slate-200 dark:border-white/5 shadow-sm space-y-2 whitespace-pre-wrap">
                    {msg.text}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-1">
                    {timeString} · {t('chatbot_ai')}
                </span>
            </div>
        </div>
    );
};
export default MessageBubble;
