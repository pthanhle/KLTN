import Header from './Header';
import MessageList from './MessageList';
import InputArea from './InputArea';

const ChatBox = ({ onClose, messages, isLoading, messagesEndRef, inputText, setInputText, handleSendMessage, onConfirmBooking, t }) => {
    return (
        <div className="flex-1 bg-slate-50/95 dark:bg-[#141416]/95 backdrop-blur-3xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 dark:border-white/10 flex flex-col relative overflow-hidden z-10 w-full h-full">
            <Header onClose={onClose} t={t} />
            <MessageList
                messages={messages}
                isLoading={isLoading}
                messagesEndRef={messagesEndRef}
                t={t}
                onConfirmBooking={onConfirmBooking}
            />
            <InputArea
                inputText={inputText}
                setInputText={setInputText}
                isLoading={isLoading}
                handleSendMessage={handleSendMessage}
                t={t}
            />
        </div>
    );
};

export default ChatBox;
