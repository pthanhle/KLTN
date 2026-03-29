import { useState, useRef, useEffect } from 'react';
import { AiAPI } from '@/services/api/ai';
import { DEFAULT_BOT_MSG } from '../constants/chatbot.constants';

export const useAIChatbotLogic = (isOpen) => {
    const [sessions, setSessions] = useState(() => {
        const saved = localStorage.getItem('carsShop_chatSessions');
        if (saved) return JSON.parse(saved);
        return [{ id: Date.now(), title: 'Hội thoại mới', messages: [DEFAULT_BOT_MSG] }];
    });
    
    const [currentSessionId, setCurrentSessionId] = useState(sessions[0]?.id);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('carsShop_chatSessions', JSON.stringify(sessions));
    }, [sessions]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [sessions, currentSessionId, isOpen, isLoading]);

    const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
    const messages = currentSession?.messages || [];

    const handleCreateNewSession = () => {
        const newSession = {
            id: Date.now(),
            title: `Hội thoại ${sessions.length + 1}`,
            messages: [DEFAULT_BOT_MSG]
        };
        setSessions([newSession, ...sessions]);
        setCurrentSessionId(newSession.id);
    };

    const handleDeleteSession = (e, id) => {
        e.stopPropagation();
        const updated = sessions.filter(s => s.id !== id);
        if (updated.length === 0) {
            const fresh = [{ id: Date.now(), title: 'Hội thoại mới', messages: [DEFAULT_BOT_MSG] }];
            setSessions(fresh);
            setCurrentSessionId(fresh[0].id);
        } else {
            setSessions(updated);
            if (currentSessionId === id) setCurrentSessionId(updated[0].id);
        }
    };

    const updateCurrentSessionMessages = (newMessages) => {
        setSessions(prev => prev.map(s => 
            s.id === currentSessionId ? { ...s, messages: newMessages } : s
        ));
    };

    const handleSendMessage = async (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        if (!inputText.trim() || isLoading) return;

        const userMsg = inputText.trim();
        const newMessages = [...messages, { sender: 'user', text: userMsg }];
        
        setSessions(prev => prev.map(s => {
            if (s.id === currentSessionId && s.messages.length === 1) {
                return { ...s, title: userMsg.slice(0, 20) + (userMsg.length > 20 ? '...' : ''), messages: newMessages };
            }
            if (s.id === currentSessionId) return { ...s, messages: newMessages };
            return s;
        }));
        
        setInputText('');
        setIsLoading(true);

        try {
            const res = await AiAPI.askPricing(userMsg);
            if (res && res.answer) {
                updateCurrentSessionMessages([...newMessages, { sender: 'bot', text: res.answer }]);
            } else {
                updateCurrentSessionMessages([...newMessages, { sender: 'bot', text: 'Xin lỗi, tôi chưa hiểu rõ ý bạn.' }]);
            }
        } catch (error) {
            console.error(error);
            updateCurrentSessionMessages([...newMessages, { sender: 'bot', text: 'Xin lỗi, hệ thống AI đang gặp sự cố.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
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
    };
};
