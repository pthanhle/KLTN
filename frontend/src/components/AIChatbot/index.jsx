import { useTranslation } from 'react-i18next';
import { useAIChatbotLogic } from './hooks/useAIChatbotLogic';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';

const AIChatbot = ({ isOpen, onClose }) => {
    const { t } = useTranslation('layout');
    
    const {
        sessions,
        currentSessionId,
        setCurrentSessionId,
        inputText,
        setInputText,
        isLoading,
        messagesEndRef,
        messages,
        handleCreateNewSession,
        handleDeleteSession,
        handleSendMessage
    } = useAIChatbotLogic(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-row w-[90vw] md:w-[700px] h-[550px] max-h-[85vh] bg-white dark:bg-[#161a23] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden font-sans transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in-50">
            
            <ChatSidebar 
                sessions={sessions}
                currentSessionId={currentSessionId}
                setCurrentSessionId={setCurrentSessionId}
                handleCreateNewSession={handleCreateNewSession}
                handleDeleteSession={handleDeleteSession}
                t={t}
            />

            <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#161a23] w-full max-w-full">
                <ChatHeader onClose={onClose} t={t} />
                <MessageList 
                    messages={messages} 
                    isLoading={isLoading} 
                    messagesEndRef={messagesEndRef} 
                />
                <ChatInput 
                    inputText={inputText}
                    setInputText={setInputText}
                    isLoading={isLoading}
                    handleSendMessage={handleSendMessage}
                    t={t}
                />
            </div>
        </div>
    );
};

export default AIChatbot;
