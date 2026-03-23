import { Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-[#0b0f19]">
            {messages.map((msg, idx) => (
                <ChatMessage key={idx} msg={msg} />
            ))}
            
            {isLoading && (
                <div className="flex w-full justify-start">
                    <div className="flex gap-2 max-w-[85%] flex-row">
                        <div className="w-6 h-6 shrink-0 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 mt-1">
                            <Bot size={12} />
                        </div>
                        <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#1e2330] border border-gray-100 dark:border-gray-800 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
