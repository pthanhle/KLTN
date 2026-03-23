import { Bot, User as UserIcon } from 'lucide-react';

const ChatMessage = ({ msg }) => {
    const isUser = msg.sender === 'user';
    
    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-1">
                    {isUser ? (
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-300">
                            <UserIcon size={12} />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center text-slate-900">
                            <Bot size={12} />
                        </div>
                    )}
                </div>

                <div className={`px-4 py-2.5 rounded-2xl text-[14px] leading-[1.6] whitespace-pre-wrap break-words ${
                    isUser
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-tr-sm'
                    : 'bg-white dark:bg-[#1e2330] border border-gray-100 dark:border-gray-800 text-slate-700 dark:text-slate-300 rounded-tl-sm shadow-sm'
                }`}>
                    {msg.text}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
