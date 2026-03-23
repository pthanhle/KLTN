import MessageBubble from './MessageBubble';
import AITyping from './AITyping';

const MessageList = ({ messages, isLoading, messagesEndRef, t }) => {
    return (
        <main className="flex-1 overflow-y-auto chat-scrollbar p-4 md:p-6 space-y-6">
            {messages.map((msg, idx) => (
                <MessageBubble 
                    key={idx} 
                    msg={msg}
                    t={t} 
                />
            ))}
            {isLoading && <AITyping />}
            <div ref={messagesEndRef} className="h-4" />
        </main>
    );
};
export default MessageList;
