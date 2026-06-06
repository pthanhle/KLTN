import { useTranslation } from 'react-i18next';
import { useAIChatbotLogic } from './hooks/useAIChatbotLogic';
import ChatSidebar from './components/ChatSidebar';
import ChatBox from './components/ChatBox';

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
        handleSendMessage,
        handleConfirmBooking,
    } = useAIChatbotLogic(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 z-[100] w-full md:w-[650px] lg:w-[680px] h-[100dvh] md:h-[550px] lg:h-[600px] max-h-[85vh] flex gap-3 lg:gap-4 animate-in slide-in-from-bottom-5 fade-in duration-300 md:p-0">

            <ChatSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                setCurrentSessionId={setCurrentSessionId}
                handleCreateNewSession={handleCreateNewSession}
                handleDeleteSession={handleDeleteSession}
                t={t}
            />

            <ChatBox
                onClose={onClose}
                messages={messages}
                isLoading={isLoading}
                messagesEndRef={messagesEndRef}
                inputText={inputText}
                setInputText={setInputText}
                handleSendMessage={handleSendMessage}
                onConfirmBooking={handleConfirmBooking}
                t={t}
            />
        </div>
    );
};

export default AIChatbot;
